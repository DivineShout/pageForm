Развёртывание на Netlify и локальная проверка

1) Скрипты
- dev: `npm run dev` — локальная разработка
- build: `npm run build` — сборка Nuxt (Nitro) для деплоя
- preview: `npm run preview` — локальный preview сервера

2) Netlify настройки
- Build command: npm run build
- Publish directory: .output/public
- Functions directory: .output/server
- Переменные окружения (Site settings → Build & deploy → Environment):
  - MILITO_API_KEY (обязательный для отправки писем)
  - MAIL_TO (опционально, по умолчанию 6weeks.13h@gmail.com)
- В корне проекта создан `netlify.toml` и `public/_redirects` для SPA fallback.

3) Локальная проверка после сборки
- Установите зависимости: npm ci
- Сделайте build: npm run build
- Проверьте, что создана папка .output/public и в ней есть index.html
- Запустите локальный сервер: npx serve .output/public -p 8080

4) Замечания
- Если вы используете Milito, убедитесь, что API endpoint и формат запроса совпадают с тем, что ожидает Milito. В server/api/sendMail.post.ts используется POST https://api.milito.app/send с заголовком Authorization: Bearer <MILITO_API_KEY>. При необходимости замените URL или формат тела.


