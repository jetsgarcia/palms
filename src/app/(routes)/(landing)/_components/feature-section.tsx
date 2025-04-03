import { BookOpen, Pencil, Video } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Streaming",
      description:
        "Gain access to high-quality training videos covering a wide range of topics.",
    },
    {
      icon: <Pencil className="h-6 w-6" />,
      title: "Examination",
      description:
        "Take structured exams to assess your knowledge and improve your tactical and decision-making abilities.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Grading",
      description:
        "Receive comprehensive grade reports to monitor your progress and measure your training achievements.",
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted scroll-mt-12"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Platform Features
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform provides access to training materials and resources
              for Philippine Army personnel.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
