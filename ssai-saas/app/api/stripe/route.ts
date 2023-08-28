import {absoluteUrl} from "@/lib/utils";
import {NextResponse} from "next/server";
import {auth, currentUser} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import {stripe} from "@/lib/stripe";

const settingsUrl = absoluteUrl("/settings")

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();
        console.log(userId);

        if(!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })

        if(userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "SSAI Pro",
                            description: "Unlimited AI Generations for one month"
                        },
                        unit_amount: 500,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId
            }
        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    } catch (e) {
        console.log("[STRIPE_ERROR]", e);
        return new NextResponse("Internal error", { status: 500 })
    }
}
