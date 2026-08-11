const fs = require('fs');
const path = require('path');

const filePath = path.join('/Users/hamzamoustaati/GEQO Marketing Page/geqo-marketing-site/lib/i18n/translations.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// The new tier keys for EN
const enTiers = `
    // Tiers
    tier_starter_name: "STARTER",
    tier_starter_price: "0 MAD",
    tier_starter_period: "/ month",
    tier_starter_ht: "0 MAD excl. VAT",
    tier_starter_features: ["PWA + QR Menu", "WhatsApp (orders + alerts)", "1 KDS screen", "CRM capture with consent", "Grace buffer -75 MAD (≈ 25 orders)", "1 POS"],
    tier_starter_fence: "No drivers, no marketing campaigns — the entry door.",
    tier_starter_toll: "3.00 MAD incl. VAT / order (i.e. 2.50 MAD excl. VAT)",
    tier_starter_wallet: "Initial top-up: 149 MAD incl. VAT (i.e. 124 MAD excl. VAT — ≈ 50 orders) ; subsequent top-ups from 50 MAD ; optional auto-recharge (under 30 MAD)",
    tier_pro_name: "PRO",
    tier_pro_price: "599 MAD",
    tier_pro_period: "/ month incl. VAT",
    tier_pro_ht: "i.e. 499 MAD excl. VAT",
    tier_pro_founder: "499 MAD / month incl. VAT",
    tier_pro_features: ["Unlimited orders (0 MAD per order)", "2 KDS screens", "3 drivers with dispatch + 4-digit PIN", "Delivery geo-fencing", "Full CRM + advanced stats"],
    tier_pro_callout: "Annual payment = 2 months free",
    tier_pro_micro: "7 orders / day = Free Pro (599 ÷ 3 MAD ≈ 200 orders/month)",
    tier_scale_name: "SCALE",
    tier_scale_price: "1 299 MAD",
    tier_scale_period: "/ month incl. VAT",
    tier_scale_ht: "i.e. 1 082 MAD excl. VAT",
    tier_scale_founder: "1 099 MAD / month incl. VAT",
    tier_scale_features: ["Unlimited orders", "Unlimited KDS screens & drivers", "Full CRM + WhatsApp Boost Campaigns", "Loyalty / Referral", "Raw CRM export", "Priority support"],
    tier_scale_micro: "Scale = your Mymenu bill… with the kitchen and drivers included.",
    tier_multi_name: "MULTI",
    tier_multi_price: "2 099 MAD",
    tier_multi_period: "/ month incl. VAT",
    tier_multi_ht: "i.e. 1 749 MAD excl. VAT",
    tier_multi_founder: "1 799 MAD / month incl. VAT",
    tier_multi_features: ["Up to 5 POS (+349 MAD incl. VAT / additional POS)", "Full Scale pack", "Dedicated manager"],
    tier_multi_micro: "Multi = 46% cheaper than 3 × Scale.",`;

const frTiers = `
    // Tiers
    tier_starter_name: "STARTER",
    tier_starter_price: "0 MAD",
    tier_starter_period: "/ mois",
    tier_starter_ht: "0 MAD HT",
    tier_starter_features: ["PWA + Menu QR", "WhatsApp (commandes + alertes)", "1 écran KDS", "Capture CRM avec consentement", "Marge de confiance -75 MAD (≈ 25 commandes)", "1 point de vente"],
    tier_starter_fence: "Sans livreurs, sans campagnes marketing — la porte d'entrée.",
    tier_starter_toll: "3,00 MAD TTC / commande (soit 2,50 MAD HT)",
    tier_starter_wallet: "Recharge initiale: 149 MAD TTC (soit 124 MAD HT — ≈ 50 commandes) ; recharges suivantes dès 50 MAD ; recharge auto optionnelle (sous 30 MAD)",
    tier_pro_name: "PRO",
    tier_pro_price: "599 MAD",
    tier_pro_period: "/ mois TTC",
    tier_pro_ht: "soit 499 MAD HT",
    tier_pro_founder: "499 MAD / mois TTC",
    tier_pro_features: ["Commandes illimitées (0 MAD par commande)", "2 écrans KDS", "3 livreurs avec dispatching + Code PIN 4 chiffres", "Geo-fencing livraison", "CRM complet + statistiques avancées"],
    tier_pro_callout: "Paiement annuel = 2 mois offerts",
    tier_pro_micro: "7 commandes / jour = Pro gratuit (599 ÷ 3 MAD ≈ 200 commandes/mois)",
    tier_scale_name: "SCALE",
    tier_scale_price: "1 299 MAD",
    tier_scale_period: "/ mois TTC",
    tier_scale_ht: "soit 1 082 MAD HT",
    tier_scale_founder: "1 099 MAD / mois TTC",
    tier_scale_features: ["Commandes illimitées", "Écrans KDS & livreurs illimités", "Full CRM + Campagnes WhatsApp Boost", "Fidélité / Parrainage", "Export CRM brut", "Support prioritaire"],
    tier_scale_micro: "Scale = votre facture Mymenu… avec la cuisine et les livreurs.",
    tier_multi_name: "MULTI",
    tier_multi_price: "2 099 MAD",
    tier_multi_period: "/ mois TTC",
    tier_multi_ht: "soit 1 749 MAD HT",
    tier_multi_founder: "1 799 MAD / mois TTC",
    tier_multi_features: ["Jusqu'à 5 points de vente (+349 MAD TTC / PDV supplémentaire)", "Tout le pack Scale", "Manager dédié"],
    tier_multi_micro: "Multi = 46 % moins cher que 3 × Scale.",`;

const arTiers = `
    // Tiers
    tier_starter_name: "STARTER",
    tier_starter_price: "0 درهم",
    tier_starter_period: "/ شهر",
    tier_starter_ht: "0 درهم بدون ضريبة",
    tier_starter_features: ["PWA + قائمة QR", "واتساب (طلبات + تنبيهات)", "شاشة KDS واحدة", "التقاط CRM مع الموافقة", "هامش ثقة -75 درهم (≈ 25 طلب)", "نقطة بيع واحدة"],
    tier_starter_fence: "بدون مناديب توصيل، بدون حملات تسويقية — البوابة الأساسية.",
    tier_starter_toll: "3.00 درهم شاملة الضريبة / للطلب (أي 2.50 درهم بدون ضريبة)",
    tier_starter_wallet: "تعبئة أولية: 149 درهم شاملة الضريبة (أي 124 درهم بدون ضريبة — ≈ 50 طلب) ; تعبئات لاحقة ابتداءً من 50 درهم ; تعبئة تلقائية اختيارية (تحت 30 درهم)",
    tier_pro_name: "PRO",
    tier_pro_price: "599 درهم",
    tier_pro_period: "/ شهر شامل الضريبة",
    tier_pro_ht: "أي 499 درهم بدون ضريبة",
    tier_pro_founder: "499 درهم / شهر شامل الضريبة",
    tier_pro_features: ["طلبات غير محدودة (0 درهم للطلب)", "شاشتان KDS", "3 مناديب توصيل مع نظام تأكيد PIN", "سياج جغرافي للتوصيل", "CRM كامل + إحصائيات متقدمة"],
    tier_pro_callout: "دفع سنوي = شهران مجاناً",
    tier_pro_micro: "7 طلبات / يوم = Pro مجاني (599 ÷ 3 درهم ≈ 200 طلب/شهر)",
    tier_scale_name: "SCALE",
    tier_scale_price: "1,299 درهم",
    tier_scale_period: "/ شهر شامل الضريبة",
    tier_scale_ht: "أي 1,082 درهم بدون ضريبة",
    tier_scale_founder: "1,099 درهم / شهر شامل الضريبة",
    tier_scale_features: ["طلبات غير محدودة", "شاشات KDS ومناديب غير محدودين", "CRM كامل + حملات WhatsApp Boost", "ولاء / إحالة", "تصدير CRM خام", "دعم ذو أولوية"],
    tier_scale_micro: "Scale = فاتورة Mymenu الخاصة بك… مع المطبخ والمناديب.",
    tier_multi_name: "MULTI",
    tier_multi_price: "2,099 درهم",
    tier_multi_period: "/ شهر شامل الضريبة",
    tier_multi_ht: "أي 1,749 درهم بدون ضريبة",
    tier_multi_founder: "1,799 درهم / شهر شامل الضريبة",
    tier_multi_features: ["حتى 5 نقاط بيع (+349 درهم شاملة الضريبة / نقطة إضافية)", "باقة Scale بالكامل", "مدير مخصص"],
    tier_multi_micro: "Multi = أرخص بـ 46% من 3 × Scale.",`;

// Replace FR values
content = content.replace(
  /hero_tag:\s*"\/\/\s*LA PLATEFORME WHATSAPP 0% COMMISSION",/g,
  'hero_tag: "// MOTEUR EN SERVICE : OPERATONNEL SUR CASABLANCA & SETTAT",'
);
content = content.replace(
  /hero_headline:\s*"Arrêtez de Donner 25% de Vos Revenus aux Apps de Livraison.",/g,
  'hero_headline: "L-ma7al ma7alek, w r-rba7 7ta huwa dialek.",'
);
content = content.replace(
  /hero_subheadline:\s*"Recevez vos commandes Tacos, Burgers & Pizza directement sur WhatsApp avec un menu PWA ultra-rapide et un écran cuisine KDS. Exactement 3.0 MAD par commande.",/g,
  'hero_subheadline: "Le moteur haute vélocité installé sur les murs de votre cuisine. Remplacez le chaos des tablettes par un écran KDS Vue 3, un menu WhatsApp PWA instantané et 0% de commission.",'
);
content = content.replace(
  /pricing_founder_banner:\s*"Offre de Lancement — Prix Fondateur : réservé aux 100 premiers restaurants !",/g,
  'pricing_founder_banner: "Offre de Lancement : Réservé aux 100 premiers restaurants !",'
);

// Replace AR values
content = content.replace(
  /hero_headline:\s*"توقف عن إعطاء 25% من إيراداتك لتطبيقات التوصيل.",/g,
  'hero_headline: "المحل محلك، والربح حتى هو ديالك.",'
);
content = content.replace(
  /hero_subheadline:\s*"استلم طلباتك مباشرة على واتساب مع قائمة PWA سريعة وشاشة مطبخ KDS. فقط 3.0 درهم للطلب الواحد.",/g,
  'hero_subheadline: "محرك التوصيل السريع على حائط مطبخك. استبدل فوضى اللوحات بوحدة KDS واحدة، وطلب مباشر عبر واتساب، و 0% عمولة.",'
);
content = content.replace(
  /pricing_founder_banner:\s*"عرض الإطلاق — سعر المؤسس: مخصص لأول 100 مطعم!",/g,
  'pricing_founder_banner: "عرض الإطلاق: حصر لـ 100 مطعم الأول فقط!",'
);

// Add the tier keys at the end of each section. We can look for `footer_contact:`
// EN section
content = content.replace(
  /footer_contact:\s*"WhatsApp Contact"\n\s*},/g,
  'footer_contact: "WhatsApp Contact",\n' + enTiers + '\n  },'
);
// FR section
content = content.replace(
  /footer_contact:\s*"WhatsApp Contact"\n\s*},/g,
  'footer_contact: "WhatsApp Contact",\n' + frTiers + '\n  },'
);
// AR section
content = content.replace(
  /footer_contact:\s*"تواصل عبر واتساب"\n\s*}/g,
  'footer_contact: "تواصل عبر واتساب",\n' + arTiers + '\n  }'
);

fs.writeFileSync(filePath, content);
console.log('Done!');
