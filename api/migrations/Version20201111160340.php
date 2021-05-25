<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201111160340 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, name VARCHAR(150) NOT NULL, last_name VARCHAR(150) NOT NULL, phone VARCHAR(20) NOT NULL, rue VARCHAR(50) DEFAULT NULL, city VARCHAR(60) DEFAULT NULL, status TINYINT(1) NOT NULL, date_of_birth DATE NOT NULL, date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, date_modified DATETIME DEFAULT NULL, reference VARCHAR(255) DEFAULT NULL, zip_code VARCHAR(20) DEFAULT NULL, accept_conditions_user TINYINT(1) NOT NULL, accept_receive_news_letters TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE thematic (id INT AUTO_INCREMENT NOT NULL, author_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL, file_name VARCHAR(255) NOT NULL, INDEX IDX_7C1CDF72F675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE outsider (id INT AUTO_INCREMENT NOT NULL, legal_represent_id INT NOT NULL, denomination VARCHAR(150) NOT NULL, number_siret VARCHAR(60) NOT NULL, street VARCHAR(150) NOT NULL, other_information_addresse VARCHAR(150) NOT NULL, city VARCHAR(150) NOT NULL, code_naf VARCHAR(150) NOT NULL, cuntry VARCHAR(200) NOT NULL, form_legal VARCHAR(200) NOT NULL, date_created DATETIME NOT NULL, date_modified DATETIME DEFAULT NULL, INDEX IDX_530913BD2BCE81B3 (legal_represent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE destination (id INT AUTO_INCREMENT NOT NULL, author_id INT NOT NULL, address VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, file_name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_3EC63EAAF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, author_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, file_name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_64C19C1F675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE location (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, destination_id INT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, street VARCHAR(255) NOT NULL, postal_code VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, rooms INT NOT NULL, surface DOUBLE PRECISION NOT NULL, travelers INT NOT NULL, created_at DATETIME NOT NULL, status SMALLINT NOT NULL, INDEX IDX_5E9E89CB12469DE2 (category_id), INDEX IDX_5E9E89CB816C6140 (destination_id), INDEX IDX_5E9E89CBA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE review (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, location_id INT NOT NULL, comment LONGTEXT DEFAULT NULL, rating SMALLINT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_794381C6A76ED395 (user_id), INDEX IDX_794381C664D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE location_thematic (location_id INT NOT NULL, thematic_id INT NOT NULL, INDEX IDX_AD49FD9064D218E (location_id), INDEX IDX_AD49FD902395FCED (thematic_id), PRIMARY KEY(location_id, thematic_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, location_id INT NOT NULL, file_name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, description VARCHAR(255) NOT NULL, INDEX IDX_C53D045F64D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE field (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, name VARCHAR(255) NOT NULL, label VARCHAR(255) NOT NULL, type_name VARCHAR(255) NOT NULL, INDEX IDX_5BF5455812469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE field_value (id INT AUTO_INCREMENT NOT NULL, field_id INT NOT NULL, location_id INT NOT NULL, field_value VARCHAR(255) NOT NULL, INDEX IDX_36D0CECF443707B0 (field_id), INDEX IDX_36D0CECF64D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE choice_item (id INT AUTO_INCREMENT NOT NULL, field_id INT NOT NULL, label VARCHAR(255) NOT NULL, value_item VARCHAR(255) NOT NULL, INDEX IDX_4A849A3D443707B0 (field_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE booking (id INT AUTO_INCREMENT NOT NULL, location_id INT NOT NULL, customer_id INT NOT NULL, date_debut DATE NOT NULL, date_fin DATE NOT NULL, number_person INT NOT NULL, date_created DATETIME NOT NULL, date_modified DATETIME DEFAULT NULL, status SMALLINT DEFAULT NULL, INDEX IDX_E00CEDDE64D218E (location_id), INDEX IDX_E00CEDDE9395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE payment (id INT AUTO_INCREMENT NOT NULL, booking_id INT DEFAULT NULL, name VARCHAR(180) NOT NULL, last_name VARCHAR(180) NOT NULL, mail VARCHAR(200) NOT NULL, token_stripe LONGTEXT NOT NULL, created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, card_number VARCHAR(20) NOT NULL, exp_date VARCHAR(8) NOT NULL, cvc VARCHAR(4) NOT NULL, montant DOUBLE PRECISION NOT NULL, UNIQUE INDEX UNIQ_6D28840D3301C60 (booking_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE activity (id INT AUTO_INCREMENT NOT NULL, location_id INT NOT NULL, user_id INT NOT NULL, description LONGTEXT NOT NULL, distance VARCHAR(255) NOT NULL, price DOUBLE PRECISION DEFAULT \'0\', created_at DATETIME NOT NULL, INDEX IDX_AC74095A64D218E (location_id), INDEX IDX_AC74095AA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image_activity (id INT AUTO_INCREMENT NOT NULL, activity_id INT NOT NULL, description VARCHAR(255) NOT NULL, file_name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_238487F281C06096 (activity_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, author_id INT NOT NULL, locations_id INT DEFAULT NULL, activities_id INT DEFAULT NULL, content LONGTEXT NOT NULL, date_created DATETIME NOT NULL, date_modified DATETIME DEFAULT NULL, status TINYINT(1) NOT NULL, INDEX IDX_9474526CF675F31B (author_id), INDEX IDX_9474526CED775E23 (locations_id), INDEX IDX_9474526C2A4DB562 (activities_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE thematic ADD CONSTRAINT FK_7C1CDF72F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE outsider ADD CONSTRAINT FK_530913BD2BCE81B3 FOREIGN KEY (legal_represent_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE destination ADD CONSTRAINT FK_3EC63EAAF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT FK_64C19C1F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE location ADD CONSTRAINT FK_5E9E89CB12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE location ADD CONSTRAINT FK_5E9E89CB816C6140 FOREIGN KEY (destination_id) REFERENCES destination (id)');
        $this->addSql('ALTER TABLE location ADD CONSTRAINT FK_5E9E89CBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C664D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE location_thematic ADD CONSTRAINT FK_AD49FD9064D218E FOREIGN KEY (location_id) REFERENCES location (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE location_thematic ADD CONSTRAINT FK_AD49FD902395FCED FOREIGN KEY (thematic_id) REFERENCES thematic (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F64D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE field ADD CONSTRAINT FK_5BF5455812469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE field_value ADD CONSTRAINT FK_36D0CECF443707B0 FOREIGN KEY (field_id) REFERENCES field (id)');
        $this->addSql('ALTER TABLE field_value ADD CONSTRAINT FK_36D0CECF64D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE choice_item ADD CONSTRAINT FK_4A849A3D443707B0 FOREIGN KEY (field_id) REFERENCES field (id)');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE64D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE9395C3F3 FOREIGN KEY (customer_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840D3301C60 FOREIGN KEY (booking_id) REFERENCES booking (id)');
        $this->addSql('ALTER TABLE activity ADD CONSTRAINT FK_AC74095A64D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE activity ADD CONSTRAINT FK_AC74095AA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE image_activity ADD CONSTRAINT FK_238487F281C06096 FOREIGN KEY (activity_id) REFERENCES activity (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CED775E23 FOREIGN KEY (locations_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C2A4DB562 FOREIGN KEY (activities_id) REFERENCES activity (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C2A4DB562');
        $this->addSql('ALTER TABLE image_activity DROP FOREIGN KEY FK_238487F281C06096');
        $this->addSql('ALTER TABLE payment DROP FOREIGN KEY FK_6D28840D3301C60');
        $this->addSql('ALTER TABLE field DROP FOREIGN KEY FK_5BF5455812469DE2');
        $this->addSql('ALTER TABLE location DROP FOREIGN KEY FK_5E9E89CB12469DE2');
        $this->addSql('ALTER TABLE location DROP FOREIGN KEY FK_5E9E89CB816C6140');
        $this->addSql('ALTER TABLE choice_item DROP FOREIGN KEY FK_4A849A3D443707B0');
        $this->addSql('ALTER TABLE field_value DROP FOREIGN KEY FK_36D0CECF443707B0');
        $this->addSql('ALTER TABLE activity DROP FOREIGN KEY FK_AC74095A64D218E');
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDE64D218E');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CED775E23');
        $this->addSql('ALTER TABLE field_value DROP FOREIGN KEY FK_36D0CECF64D218E');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F64D218E');
        $this->addSql('ALTER TABLE location_thematic DROP FOREIGN KEY FK_AD49FD9064D218E');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C664D218E');
        $this->addSql('ALTER TABLE location_thematic DROP FOREIGN KEY FK_AD49FD902395FCED');
        $this->addSql('ALTER TABLE activity DROP FOREIGN KEY FK_AC74095AA76ED395');
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDE9395C3F3');
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY FK_64C19C1F675F31B');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CF675F31B');
        $this->addSql('ALTER TABLE destination DROP FOREIGN KEY FK_3EC63EAAF675F31B');
        $this->addSql('ALTER TABLE location DROP FOREIGN KEY FK_5E9E89CBA76ED395');
        $this->addSql('ALTER TABLE outsider DROP FOREIGN KEY FK_530913BD2BCE81B3');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C6A76ED395');
        $this->addSql('ALTER TABLE thematic DROP FOREIGN KEY FK_7C1CDF72F675F31B');
        $this->addSql('DROP TABLE activity');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE choice_item');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE destination');
        $this->addSql('DROP TABLE field');
        $this->addSql('DROP TABLE field_value');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE image_activity');
        $this->addSql('DROP TABLE location');
        $this->addSql('DROP TABLE location_thematic');
        $this->addSql('DROP TABLE outsider');
        $this->addSql('DROP TABLE payment');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE thematic');
        $this->addSql('DROP TABLE user');
    }
}
