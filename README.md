# معرض اعمالي | أحمد طارق

نسخة عربية مستقلة من معرض الأعمال الأصلي، تضم 55 مشروعًا تفاعليًا واتجاه RTL.

## المتجر

564 منتجًا: 543 جهازًا منزليًا من فريش المصرية، و13 شاشة من فريش، و8 نماذج هواتف وحواسيب عالمية من DummyJSON. لا تعني العلامة المصرية أن كل موديل صنع في مصر. جميع الأسعار مولّدة للتجربة بالجنيه المصري، وليست عروضًا حقيقية. لا طلبات أو مدفوعات حقيقية. مصادر الصور والموديلات داخل تفاصيل المنتجات وفي shop-lane/catalog/SOURCES.md.

## الطقس

خدمة Open-Meteo الحالية والمتوقعة مع بحث عالمي للمدن، وقائمة 251 دولة وإقليمًا، وإدخال الإحداثيات لأي موقع. البيانات نماذج أرصاد وليست قياسات محطة محلية في كل نقطة. لا تستخدم بيانات تجريبية عند انقطاع الخدمة. تتطلب اتصالًا بالإنترنت وتخضع لحدود الخدمة المجانية للاستخدام غير التجاري. الإسناد إلى Open-Meteo وGeoNames ظاهر داخل التطبيق.

## التشغيل

موقع ثابت. للتجربة محليًا: python -m http.server 8000. البيانات المحلية محفوظة في المتصفح، وليست مرتبطة بحسابات بنكية أو متاجر أو مزامنة سحابية. المشروعات توضيحية ولا تنفذ معاملات حقيقية.

مصدر قائمة الدول والأقاليم (أسماء ورموز وعواصم فقط، لا تستخدم إحداثيات المصدر): https://github.com/Khodour/countries.json

مصدر صور كروت المشروعات وترخيصها: COVER-CREDITS.md. تم الحفاظ على الصور المختارة في النسخة الأصلية مع نصوص عربية.


## November expansion

55 separate project routes, including 15 Games and 15 Creative projects. New tools: 20-language Monaco editor with HTML/CSS/JavaScript sandbox execution (other languages are editing only), MyMemory translator, and an integrated portfolio assistant. The assistant uses the published portfolio as its knowledge base. Optional real multilingual semantic search runs in the browser using Transformers.js and the 118 MB quantized Xenova/paraphrase-multilingual-MiniLM-L12-v2 model. It is retrieval, not general-purpose generative chat. Keyword search remains available without downloading the model. Questions are not sent to a hosted chat API.

Noise Maker generates white, pink and brown noise locally. Audio starts after a user gesture and awaits AudioContext.resume() before scheduling sound. Audio output was tested with an analyser at the destination for Noise Maker, Sound Lab and Drum Machine. Device mute switches, browser background suspension and hardware volume remain under the visitor's control.

External runtime dependencies: Monaco Editor 0.52.2 from jsDelivr (MIT), Transformers.js 3.7.3 from jsDelivr (Apache-2.0), model files from Hugging Face (Apache-2.0). Translation text is sent to api.mymemory.translated.net only after clicking Translate; public service quotas and availability apply. Weather remains Open-Meteo. No API keys are embedded.
