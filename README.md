## Server
- /GaziQuiz/src/GaziQuiz.WebApi projesi içerisindeki appsettings.json dosyası içinde bulunan Connection string değiştirilir.
- Package Manager konsolu açılır.
- 'update-database' komutu çalıştırlır.
- /src/GaziQuiz.WebApi projesi altında 'dotnet run' komutu çalıştırılarak backend ayağa kaldırılır.

## Client Uygulaması
- /gazi-quiz-client/src/core/services/instance.ts dosyası içerisindeki baseApiUrl değişkenine backend'in url'i verilir.
- /gazi-quiz-client/ içerisinde 'npm install' komutu çalıştırılır.
- /gazi-quiz-client/ içerisinde 'npm run dev' komutu ile client uygulaması ayağa kaldırılır.
