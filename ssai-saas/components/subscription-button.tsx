"use client"

import {Button} from "@/components/ui/button";
import {Zap} from "lucide-react";
import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast";

interface SubscriptionInterface {
    isPro: boolean;
}

export const SubscriptionButton = ({ isPro = false }: SubscriptionInterface) =>  {
    const [loading, setLoading] = useState(false);

    const billing = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url
        } catch (e) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button variant={isPro ? "default" : "custom"} onClick={billing}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}
