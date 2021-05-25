<?php

namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Component\Mime\Part\Multipart\FormDataPart;
use Symfony\Component\Mime\Part\DataPart;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Entity\Destination;
// use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class DestinationTest extends ApiTestCase
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

    

    public function testGetDestinations(): void
    {
        // The client implements Symfony HttpClient's `HttpClientInterface`, and the response `ResponseInterface`
        $response = static::createClient()->request('GET', '/api/v01/All/destinations');

        $this->assertResponseIsSuccessful();
        // Asserts that the returned content type is JSON-LD (the default)
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            "@context"=> "/api/v01/contexts/Destination",
            "@id" => "/api/v01/All/destinations",
            "@type" => "hydra:Collection",
        ]);

        $this->assertResponseStatusCodeSame(200);

        
        $this->assertMatchesResourceCollectionJsonSchema(Destination::class);
    }

   

    

    /**
     * @depends testLogin
     */
     public function testCreateInvalidDestination(string $token): void
    {
      
        $response=static::createClient()->request('POST', '/api/v01/destinations', ['json' => [
            'address' => '',
            'description' => ""
        ],
        'headers' => [
            'Authorization' => "Bearer $token",
            'Content-Type' => 'multipart/form-data',
		],
        ]);
  
        $this->assertResponseStatusCodeSame(400);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/api/v01/contexts/ConstraintViolationList',
            '@type' => 'ConstraintViolationList',
            'hydra:title' => 'An error occurred',
            // 'hydra:description' => '',
        ]);
    }


    /**
     * @depends testLogin
     */
    public function testCreateValidDestination(string $token): void
    {
      
        $client = static::createClient();

        $file = new UploadedFile(
            'C:\Users\kifac\OneDrive\Documents\projects\Project\apiatypikhouse\tests\lille.jpg',
            'lille.jpg',
            'image/jpg',
        );


        $response=$client->request('POST', '/api/v01/destinations', [
            'headers' => [
                'Content-Type' => 'multipart/form-data',
                'Authorization' => "Bearer $token",
            ],
            ],
            [
                'file'=>$file,
            ],
            [
                'address' => 'Paris',
                'description' => "Paris",
            ]
            );
       
  
        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
    }




    
}