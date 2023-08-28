import {Heading} from "@/components/heading";
import {Cog} from "lucide-react";
import {checkSubscription} from "@/lib/subscription";
import {SubscriptionButton} from "@/components/subscription-button";

const SettingsPage = async () => {
    const isPro = await checkSubscription();

    return (
        <div>
            <Heading
                title="Settings"
                description="Manage account"
                icon={Cog}
                iconColor="text-white-500"
                bgColor="bg-gray-500/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPro ? "You are currently on a PRO plan" : "You are currently on a FREE plan"}
                </div>
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>
    );
};

export default SettingsPage;
