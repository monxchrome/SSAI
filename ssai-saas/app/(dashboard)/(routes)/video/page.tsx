"use client";

import * as z from "zod"
import {Heading} from "@/components/heading";
import {BringToFront, MessageSquarePlus, Music, Video} from "lucide-react";
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
import {useProModal} from "@/hooks/use-pro-modal";

const VideoPage = () => {
    const [video, setVideo] = useState<string>();
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const proModal = useProModal();

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post("/api/video", values);

            setVideo(response.data[0]);
            form.reset();
        } catch (e: any) {
            if(e?.response?.status === 403) {
                proModal.onOpen();
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Video Generation"
                description="Start generate video with SSAI"
                icon={Video}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10" />
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
                                            placeholder="Supernova is explosing"
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
                    {!video && !isLoading && (
                        <div>
                            <Empty label="We are waiting for your proposes :)" />
                        </div>
                    )}
                    {video && (
                        <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
                            <source src={video} />
                        </video>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
