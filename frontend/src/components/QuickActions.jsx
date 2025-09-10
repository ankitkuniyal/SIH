import { Button } from "./ui/button.jsx";
import { Card } from "./ui/card.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export function QuickActions({ onSelectQuestion, disabled = false }) {
  const { t } = useLanguage();

  const quickQuestions = [
    t('whenToPlant'),
    t('pestControl'),
    t('fertilizer'),
    t('weatherAlert'),
    t('soilHealth'),
    t('harvest')
  ];

  return (
    <Card className="m-4 p-4">
      <h3 className="font-medium mb-3 text-center">{t('quickQuestions')}</h3>
      <div className="grid grid-cols-1 gap-2">
        {quickQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelectQuestion(question)}
            disabled={disabled}
            className="justify-start text-left h-auto py-2 px-3 whitespace-normal"
          >
            {question}
          </Button>
        ))}
      </div>
    </Card>
  );
}