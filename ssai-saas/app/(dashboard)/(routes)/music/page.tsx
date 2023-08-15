"use client";

import * as z from "zod"
import {Heading} from "@/components/heading";
import {BringToFront, MessageSquarePlus, Music} from "lucide-react";
import {useForm} from "react-hook-form";

import {formSchema} from "./constants"
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {ChatCompletionRequestMessage} from "openai";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import {cn} from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

const MusicPage = () => {
    const [music, setMusic] = useState<string>();
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);

            const response = await axios.post("/api/music", values);

            setMusic(response.data.audio);
            form.reset();
        } catch (e) {
            console.log(e);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Music Generation"
                description="Start generate music with SSAI"
                icon={Music}
                iconColor="text-green-500"
                bgColor="bg-green-500/10" />
            <div className="px-4 lg:px-8 ">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid
                            grid-cols-12 gap-2">
                            <FormField render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0
                                            focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Guitar solo"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} name="prompt" />
                            <Button className="col-span-12 lg:col-span-2 bg-gray-200 text-black hover:text-white">
                                Send <BringToFront className="ml-2" />
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-black">
                            <Loader />
                        </div>
                    )}
                    {!music && !isLoading && (
                        <div>
                            <Empty label="We are waiting for your proposes :)" />
                        </div>
                    )}
                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MusicPage;
