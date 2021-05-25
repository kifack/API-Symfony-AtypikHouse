<?php

namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Component\Mime\Part\Multipart\FormDataPart;
use Symfony\Component\Mime\Part\DataPart;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Entity\Category;
// use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class CategoryTest extends ApiTestCase
{

    public function testLogin()
    {
        $client = self::createClient();

       $response= $client->request('POST', '/login', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'dmunoz@lecomte.fr',
                'password' => 'azertyuiop'
            ],
        ]);

        $this->assertResponseIsSuccessful();

        $result =$response->toArray();
        // dd($result["token"]);

        return $result["token"];
    }

    // This trait provided by HautelookAliceBundle will take care of refreshing the database content to a known state before each test
    // use RefreshDatabaseTrait;

    public function testGetCategories(): void
    {
        // The client implements Symfony HttpClient's `HttpClientInterface`, and the response `ResponseInterface`
        $response = static::createClient()->request('GET', '/api/v01/All/categories');

        $this->assertResponseIsSuccessful();
        // Asserts that the returned content type is JSON-LD (the default)
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            '@context' => '/api/v01/contexts/Category',
            '@id' => '/api/v01/All/categories',
            '@type' => 'hydra:Collection',
        ]);

        $this->assertResponseStatusCodeSame(200);

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        // This generated JSON Schema is also used in the OpenAPI spec!
        $this->assertMatchesResourceCollectionJsonSchema(Category::class);
    }


   

    

    /**
     * @depends testLogin
     */
     public function testCreateInvalidCategory(string $token): void
    {
      
        $file = new UploadedFile(
            'C:\Users\kifac\OneDrive\Documents\projects\Project\apiatypikhouse\tests\facture.pdf',
            'facture.pdf',
            'image/jpg',
        );

        
        $client = self::createClient();

        $response=$client->request('POST', '/api/v01/categories', [
            'headers' => [
                'Content-Type' => 'multipart/form-data',
                'Authorization' => "Bearer $token",
            ],
            ],
            [
                'file'=>$file,
            ],
            [
                'name' => '',
                'description' => "",
            ]
            );

        
  
        $this->assertResponseStatusCodeSame(400);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/api/v01/contexts/ConstraintViolationList',
            '@type' => 'ConstraintViolationList',
            'hydra:title' => 'An error occurred',
        ]);
    }


    /**
     * @depends testLogin
     */
    public function testCreateValidCategory(string $token): void
    {
      
        $client = static::createClient();

        $file = new UploadedFile(
            'C:\Users\kifac\OneDrive\Documents\projects\Project\apiatypikhouse\tests\image1.jpg',
            'image1.jpg',
            'image/jpg',
        );

        

        $response=$client->request('POST', '/api/v01/categories', [
            'headers' => [
                'Content-Type' => 'multipart/form-data',
                'Authorization' => "Bearer $token",
            ],
            ],
            [
                'file'=>$file,
            ],
            [
                'name' => 'Ma cabane',
                'description' => "Une jolie cabane",
            ]
            );
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        
    }


    
}