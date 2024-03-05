# Requirements
- XAMPP
  - PHP 8.2.12 
  - MySQL 10.4.32-MariaDB server
  - Apache 2.4.58
- Laravel 10.45.1
- Composer 2.7.1

php extensions (uncomment in `php.ini`):
- extension=pdo_mysql
- extension=fileinfo

# Setup (local)
Place project folder in `htdocs` within the XAMPP folder

## Apache config (httpd.config)
Link the public directory of the project in the document root and directory, e.g.

```
DocumentRoot "C:/xampp/htdocs/to-do app/to-do-app/public"
<Directory "C:/xampp/htdocs/to-do app/to-do-app/public">
```

## Database setup
1. Enter your database credentials in `.env`, e.g.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

2. Run migrations `php artisan migrate`

## NPM (React)
1. Build the app `npm run build`

# Running the app
1. Start Apache and MySql in XAMPP
2. Run React `npm run dev` from `to-do-app`
3. Go to `localhost/`