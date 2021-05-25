<?php

namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Component\Mime\Part\Multipart\FormDataPart;
use Symfony\Component\Mime\Part\DataPart;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Entity\Category;
use App\Entity\User;
// use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class UserTest extends ApiTestCase
{

    public function testLoginAdmin()
    {
        $client = self::createClient();

       $response= $client->request('POST', '/login', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'blin.colette@sfr.fr',
                'password' => 'azertyuiop'
            ],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(200);

        $result =$response->toArray();
        // dd($result["token"]);

        return $result["token"];
    }

    public function testLoginWrongUser()
    {
        $client = self::createClient();

       $response= $client->request('POST', '/login', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'blifnn.colette@sfr.fr',
                'password' => 'addfdzertyuiop'
            ],
        ]);

       
        $this->assertResponseStatusCodeSame(401);

        $this->assertJsonContains([
            "code" => 401,
            "message" => "Invalid credentials.",
        ]);  
    }

    public function testLoginUser()
    {
        $client = self::createClient();

       $response= $client->request('POST', '/login', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'michelle.barbier@loiseau.fr',
                'password' => 'azertyuiop'
            ],
        ]);
        $this->assertResponseIsSuccessful();

        $result =$response->toArray();
        // dd($result["token"]);

        return $result["token"];
    }

  
    /**
     * @depends testLoginUser
     */
    public function testWrongAdminGetUsers($token): void
    {
        // The client implements Symfony HttpClient's `HttpClientInterface`, and the response `ResponseInterface`
        $response = static::createClient()->request('GET', '/api/v01/admin/users',
        [
            'headers' => [
                'Authorization' => "Bearer $token",
                'Content-Type' => 'application/json',
            ],
        ]);

        // Asserts that the returned content type is JSON-LD (the default)
      
        $this->assertResponseStatusCodeSame(403);
        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            "@context" => "/api/v01/contexts/Error",
            "@type" => "hydra:Error",
            "hydra:title" => "An error occurred",
            "hydra:description" => "Access Denied.",
        ]);       
    }
    
    /**
     * @depends testLoginAdmin
     */
    public function testAdminGetUsers($token): void
    {
        // The client implements Symfony HttpClient's `HttpClientInterface`, and the response `ResponseInterface`
        $response = static::createClient()->request('GET', '/api/v01/admin/users',
        [
            'headers' => [
                'Authorization' => "Bearer $token",
                'Content-Type' => 'application/json',
            ],
        ]);

        $this->assertResponseIsSuccessful();
        // Asserts that the returned content type is JSON-LD (the default)
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertResponseStatusCodeSame(200);
        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            "@context"=> "/api/v01/contexts/User",
            "@id"=> "/api/v01/users",
            "@type" =>"hydra:Collection"
        ]);

        $this->assertMatchesResourceCollectionJsonSchema(User::class);
    }


   
  
     public function testRegisterWithoutEmail(): void
    {
      
        $data=[
            "email"=>"",
            "name"=>"John",
            "lastName"=>"Doe",
            "password"=>"",
            "phone"=>"0768874103",
            "dateOfBirth"=>"1995-03-12",
            "acceptConditionsUser"=>true,
            "acceptReceiveNewsLetters"=>false
        ];
        $response=static::createClient()->request('POST', '/api/v01/users/register', ['json' => $data,
         'headers' => ['Content-Type' => 'application/json'],
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


    public function testRegisterValidUser(): void
    {
      
        $data=[
            "email"=>"test7@gmail.com",
            "name"=>"John",
            "lastName"=>"Doe",
            "password"=>"password",
            "phone"=>"0768874103",
            "dateOfBirth"=>"1995-03-12",
            "acceptConditionsUser"=>true,
            "acceptReceiveNewsLetters"=>false
        ];
        $response=static::createClient()->request('POST', '/api/v01/users/register', ['json' => $data,
        'headers' => ['Content-Type' => 'application/json'],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/api/v01/contexts/User',
            "@id"=> "/api/v01/users",
            "@type"=> "hydra:Collection",
            // 'hydra:description' => '',
        ]);
    }


    
}