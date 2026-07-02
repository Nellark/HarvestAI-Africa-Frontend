import { Injectable, signal } from '@angular/core';
import { SUPPORTED_LANGUAGES } from '../config/app.constants';

interface Translation {
  [key: string]: string | Translation;
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private currentLanguage = signal('en');
  private translations: Record<string, Translation> = {};

  readonly language = this.currentLanguage.asReadonly();

  constructor() {
    this.loadTranslations();
  }

  setLanguage(lang: string): void {
    if (SUPPORTED_LANGUAGES.some((l) => l.code === lang)) {
      this.currentLanguage.set(lang);
      localStorage.setItem('harvestai-language', lang);
      this.loadTranslations();
    }
  }

  getLanguage(): string {
    return this.currentLanguage();
  }

  translate(key: string, params?: Record<string, string>): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage()];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters
    if (params) {
      return Object.entries(params).reduce(
        (str, [param, replacement]) => str.replace(`{{${param}}}`, replacement),
        value
      );
    }

    return value;
  }

  private loadTranslations(): void {
    // In a real app, load from JSON files
    // For now, we'll have basic translations inline
    this.translations = {
      en: {
        common: {
          loading: 'Loading...',
          error: 'Error',
          retry: 'Retry',
          cancel: 'Cancel',
          save: 'Save',
          delete: 'Delete',
          edit: 'Edit',
          back: 'Back',
          next: 'Next',
          previous: 'Previous',
        },
        auth: {
          login: 'Login',
          register: 'Register',
          email: 'Email',
          password: 'Password',
          forgotPassword: 'Forgot Password?',
          loginSuccess: 'Login successful',
          registerSuccess: 'Registration successful',
        },
        dashboard: {
          title: 'Dashboard',
          welcome: 'Welcome back',
          myFarm: 'My Farm',
          weather: 'Weather',
          market: 'Market Prices',
          aiAssistant: 'AI Assistant',
        },
      },
      sw: {
        common: {
          loading: 'Inapakia...',
          error: 'Hitilafu',
          retry: 'Jaribu tena',
          cancel: 'Ghairi',
          save: 'Hifadhi',
          delete: 'Futa',
          edit: 'Hariri',
          back: 'Nyuma',
          next: 'Ifuatayo',
          previous: 'Iliyopita',
        },
        auth: {
          login: 'Ingia',
          register: 'Jiunge',
          email: 'Barua pepe',
          password: 'Nenosiri',
          forgotPassword: 'Umesahau nenosiri?',
          loginSuccess: 'Ingia kwa mafanikio',
          registerSuccess: 'Usajili umefanikiwa',
        },
        dashboard: {
          title: 'Dashibodi',
          welcome: 'Karibu tena',
          myFarm: 'Shamba langu',
          weather: 'Hali ya hewa',
          market: 'Bei ya soko',
          aiAssistant: 'Msaidizi wa AI',
        },
      },
      fr: {
        common: {
          loading: 'Chargement...',
          error: 'Erreur',
          retry: 'Réessayer',
          cancel: 'Annuler',
          save: 'Enregistrer',
          delete: 'Supprimer',
          edit: 'Modifier',
          back: 'Retour',
          next: 'Suivant',
          previous: 'Précédent',
        },
        auth: {
          login: 'Connexion',
          register: "S'inscrire",
          email: 'Email',
          password: 'Mot de passe',
          forgotPassword: 'Mot de passe oublié?',
          loginSuccess: 'Connexion réussie',
          registerSuccess: 'Inscription réussie',
        },
        dashboard: {
          title: 'Tableau de bord',
          welcome: 'Bon retour',
          myFarm: 'Ma ferme',
          weather: 'Météo',
          market: 'Prix du marché',
          aiAssistant: 'Assistant IA',
        },
      },
      pt: {
        common: {
          loading: 'Carregando...',
          error: 'Erro',
          retry: 'Tentar novamente',
          cancel: 'Cancelar',
          save: 'Salvar',
          delete: 'Excluir',
          edit: 'Editar',
          back: 'Voltar',
          next: 'Próximo',
          previous: 'Anterior',
        },
        auth: {
          login: 'Entrar',
          register: 'Registrar',
          email: 'Email',
          password: 'Senha',
          forgotPassword: 'Esqueceu a senha?',
          loginSuccess: 'Login bem-sucedido',
          registerSuccess: 'Registro bem-sucedido',
        },
        dashboard: {
          title: 'Painel',
          welcome: 'Bem-vindo de volta',
          myFarm: 'Minha fazenda',
          weather: 'Clima',
          market: 'Preços de mercado',
          aiAssistant: 'Assistente IA',
        },
      },
      ar: {
        common: {
          loading: 'جاري التحميل...',
          error: 'خطأ',
          retry: 'إعادة المحاولة',
          cancel: 'إلغاء',
          save: 'حفظ',
          delete: 'حذف',
          edit: 'تعديل',
          back: 'رجوع',
          next: 'التالي',
          previous: 'السابق',
        },
        auth: {
          login: 'تسجيل الدخول',
          register: 'تسجيل',
          email: 'البريد الإلكتروني',
          password: 'كلمة المرور',
          forgotPassword: 'نسيت كلمة المرور؟',
          loginSuccess: 'تم تسجيل الدخول بنجاح',
          registerSuccess: 'تم التسجيل بنجاح',
        },
        dashboard: {
          title: 'لوحة التحكم',
          welcome: 'مرحبًا بعودتك',
          myFarm: 'مزرعتي',
          weather: 'الطقس',
          market: 'أسعار السوق',
          aiAssistant: 'مساعد الذكاء الاصطناعي',
        },
      },
      zu: {
        common: {
          loading: 'Ilayisha...',
          error: 'Iphutha',
          retry: 'Zama kwakhona',
          cancel: 'Khansela',
          save: 'Gcina',
          delete: 'Cisha',
          edit: 'Hlela',
          back: 'Emuva',
          next: 'Okulandelayo',
          previous: 'Okudlule',
        },
        auth: {
          login: 'Ngena',
          register: 'Bhalisa',
          email: 'I-imeyili',
          password: 'Iphasiwedi',
          forgotPassword: 'Ukhohlwe iphasiwedi?',
          loginSuccess: 'Ukungena kuphumelela',
          registerSuccess: 'Ukubhalisa kuphumelela',
        },
        dashboard: {
          title: 'Ideshibhodi',
          welcome: 'Siyakwamukela',
          myFarm: 'Isitimela sami',
          weather: 'Isimo sezulu',
          market: 'Izinkomba zesitolo',
          aiAssistant: 'Usizo lwe-AI',
        },
      },
    };
  }
}
