
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-histoire-bleu-royal text-white dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="font-serif text-2xl mb-4">{t('app.title')}</h2>
          <p className="text-sm opacity-80">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
