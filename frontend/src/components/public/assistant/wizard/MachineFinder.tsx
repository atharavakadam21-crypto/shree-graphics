"use client";

import { useMemo, useState } from "react";
import { machineQuestions } from "./machineQuestions";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";
import StepIndicator from "./StepIndicator";

interface Answers {
  process?: string;
  priority?: string;
  stage?: string;
}

const recommendations: Record<
  string,
  {
    name: string;
    reason: string;
    slug?: string;
  }
> = {
  flexo: {
    name: "Flexographic Printing Machines",
    reason:
      "Your requirement points toward flexographic printing equipment. Explore the available configurations and discuss the exact production requirement with our team.",
  },
  slitting: {
    name: "Micro Slitting Machines",
    reason:
      "Your requirement points toward slitting and roll-converting equipment. Explore the available machine range and discuss the required width and application.",
  },
  "die-cutting": {
    name: "Rotary Die Cutting Machines",
    reason:
      "Your requirement points toward rotary die cutting. Explore the available die-cutting systems and discuss your label-converting requirements.",
  },
  rewinding: {
    name: "Inspection Rewinding Machines",
    reason:
      "Your requirement points toward inspection and rewinding. Explore the machine range and discuss your material and production requirements.",
  },
  core: {
    name: "Paper Core Cutting Machines",
    reason:
      "Your requirement points toward paper core cutting equipment. Explore the relevant machine range and discuss the core dimensions you require.",
  },
};

export default function MachineFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [complete, setComplete] = useState(false);

  const question = machineQuestions[step];

  const selected = useMemo(() => {
    if (!question) return undefined;
    return answers[question.id as keyof Answers];
  }, [answers, question]);

  const handleSelect = (value: string) => {
    const key = question.id as keyof Answers;

    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));

    window.setTimeout(() => {
      if (step < machineQuestions.length - 1) {
        setStep((current) => current + 1);
      } else {
        setComplete(true);
      }
    }, 180);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setComplete(false);
  };

  if (complete) {
    const recommendation =
      recommendations[answers.process ?? ""] ?? {
        name: "Shree Graphics Machine Range",
        reason:
          "Your answers indicate that one of our industrial machinery solutions may fit your requirement. Explore the machine range or speak with our sales team for a precise recommendation.",
      };

    return (
      <>
        <StepIndicator
          current={machineQuestions.length - 1}
          total={machineQuestions.length}
        />

        <ResultCard
          machineName={recommendation.name}
          reason={recommendation.reason}
          slug={recommendation.slug}
          onRestart={restart}
        />
      </>
    );
  }

  return (
    <>
      <StepIndicator
        current={step}
        total={machineQuestions.length}
      />

      <QuestionCard
        question={question.question}
        description={question.description}
        options={question.options}
        selected={selected}
        onSelect={handleSelect}
      />
    </>
  );
}
