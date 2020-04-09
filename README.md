# ChatApp

## Приложение онлайн чата

### Описание

Приложение позволяет общаться друг с другом в режиме онлайн посредством текстовых сообщений.

На заглавной странице будет предложено ввести имя пользователя и имя комнаты. Далее, открывается окно чата. Внизу располагается поле ввода сообщения, в центре - окна вывода сообщений, справа - пользователи, находящиеся в комнате. Сообщения от других пользователей отображаются в левой части окна вывода сообщений, ваши сообщения - справа. Чтобы добавить пользователя, необходимо скопировать ссылку из адресной строки, и отправить ее новому пользователю. Ему будет предложено ввести своё имя и он будет перенаправлен в искомую комнату. Одновременно может быть несколько независимых комнат.

Кроме этого, в приложении реализована возможность видео-стримов. Для начала стрима необходимо нажать кнопку камеры в правой части строки ввода чата. Все пользователи, находящиеся в комнате, увидят у себя в окне стрим. Одновременно может стримить только один человек. У ведущего есть возможность отключения микрофона, у зрителей - отключения звука стрима. При однократном нажатии на видео можно включить/выключить режим полноэкранного просмотра.

### Используемые технологии

Интерфейс реализован с помощью React JS, HTML, CSS.
Серверная часть - Express.js, Socket.IO.

### Запуск приложения

Для запуска приложения необходимо:

1. Скопировать репозиторий
2. Установить зависимости
   `npm install`
3. Запустить приложение
   `npm run start`

### Демо приложения

Приложение доступно по ссылке: https://nervous-jones-aa9c52.netlify.com/
