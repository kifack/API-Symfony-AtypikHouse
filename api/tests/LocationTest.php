<?php

namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Component\Mime\Part\Multipart\FormDataPart;
use Symfony\Component\Mime\Part\DataPart;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Entity\Location;
// use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class LocationTest extends ApiTestCase
{

    public function testLoginOwner()
    {
        $client = self::createClient();

       $response= $client->request('POST', '/login', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'chauveau.gabrielle@rodrigues.org',
                'password' => 'azertyuiop'
            ],
        ]);

        $this->assertResponseIsSuccessful();

        $result =$response->toArray();

        return $result["token"];
    }

   

    public function testGetLocations(): void
    {
        // The client implements Symfony HttpClient's `HttpClientInterface`, and the response `ResponseInterface`
        $response = static::createClient()->request('GET', '/api/v01/All/locations');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            "@context" => "/api/v01/contexts/Location",
            "@id" => "/api/v01/All/locations",
            "@type" => "hydra:Collection",
        ]);

        $this->assertResponseStatusCodeSame(200);

    
        $this->assertMatchesResourceCollectionJsonSchema(Location::class);
    }




    /**
     * @depends testLoginOwner
     */
     public function testCreateInvalidLocation(string $token): void
    {
      
           $client = static::createClient();

        $file = new UploadedFile(
            'C:\Users\kifac\OneDrive\Documents\projects\Project\apiatypikhouse\tests\facture.pdf',
            'facture.pdf',
            'image/jpg',
        );
        $file1 = new UploadedFile(
            'C:\Users\kifac\OneDrive\Documents\projects\Project\apiatypikhouse\tests\image2.jpg',
            'image2.jpg',
            'image/jpg',
        );

       

        $response=$client->request('POST', '/api/v01/locations', [
            'headers' => [
                'Content-Type' => 'multipart/form-data',
                'Authorization' => "Bearer $token",
            ],
            ],
            [
                'file'=>$file,
                'file1'=>$file1,
            ],
            [
                'name' => 'Ma cabane',
                'description' => "Une jolie cabane",
                'street' => "3 rue des sablons",
                'postal_code' => "94350",
                'city' => "Paris",
                // 'price' => 120,
                // 'rooms' => 5,
                'surface' => 30,
                'travelers' => 3,
                'category' => 20,
                'destination' => 12,
                'thematics' => "[19,20]",

            ]
            );
       
      
            // dd($response->getContent());
        $this->assertResponseStatusCodeSame(400);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/api/v01/contexts/ConstraintViolationList',
            '@type' => 'ConstraintViolationList',
            'hydra:title' => 'An error occurred',
        ]);
    }
  

    /**
     * @depends testLoginOwner
     */
    public function testCreatevalidLocation(string $token): void
    {
      
           $client = static::createClient();

        $file = new UploadedFile(
            'C:\Users\kifac\OneDrive\Documents\projects\Project\apiatypikhouse\tests\cabane2-1.jpg',
            'cabane2-1.jpg',
            'image/jpg',
        );
        $file1 = new UploadedFile(
            'C:\Users\kifac\OneDrive\Documents\projects\Project\apiatypikhouse\tests\cabane2-2.jpg',
            'cabane2-2.jpg',
            'image/jpg',
        );

       

        $response=$client->request('POST', '/api/v01/locations', [
            'headers' => [
                'Content-Type' => 'multipart/form-data',
                'Authorization' => "Bearer $token",
            ],
            ],
            [
                'file'=>$file,
                'file1'=>$file1,
            ],
            [
                'name' => 'Ma cabane',
                'description' => "Une jolie cabane",
                'street' => "3 rue des sablons",
                'postal_code' => "94350",
                'city' => "Paris",
                'price' => 120,
                'rooms' => 5,
                'surface' => 30,
                'travelers' => 3,
                'category' => 20,
                'destination' => 12,
                'thematics' => "[19,20]",

            ]
            );
       
            $this->assertResponseIsSuccessful();
            $this->assertResponseStatusCodeSame(201);
    }
  
}