"use client";

import {useEffect} from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("4d1a0721-25ef-4fe0-9411-8f490f024535")
    }, [])

    return null
}
