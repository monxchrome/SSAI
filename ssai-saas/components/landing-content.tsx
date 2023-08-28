"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const testimonials = [
    {
        name: "Maksym",
        avatar: "M",
        title: "Software Engineer",
        description: "The best AI I have ever used. Everything is"
    },
    {
        name: "Anton",
        avatar: "A",
        title: "UI/UX Designer",
        description: "This bot helped me with the choice of colors"
    },
    {
        name: "Anya",
        avatar: "M",
        title: "Junior Backend Developer",
        description: "Pretty good at problem solving"
    },
    {
        name: "Valentin",
        avatar: "M",
        title: "Junior Frontend Developer",
        description: "I could not solve a banal problem in the code - in a couple of seconds the bot identified the problem"
    }
]

const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2 ">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LandingContent;
