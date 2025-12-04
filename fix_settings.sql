USE portfolio_cms;
INSERT IGNORE INTO settings (`key`, value, created_at, updated_at) 
VALUES ('about_me', 'Welcome to my portfolio!', NOW(), NOW());
