<?php

namespace App\Entity;

use App\Repository\ReviewRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ReviewRepository::class)
 * @ApiResource(
 * collectionOperations={"get",
 * "post" ={"denormalization_context"={"groups"={"user:add_review"}}}
 * },
 * itemOperations={"get"}
 * )
 */
class Review
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reviews")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"user:add_review"})
     * @Assert\NotNull(message="Veuillez renseignez l'utilisateur")
     * 
     */
    private $user;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"user:add_review","read:location"})
     * @Assert\NotBlank(message="Veuillez renseigner une description de ce que vous avez pensé du logement")
     */
    private $comment;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"user:add_review","read:all_thematics","read:location"})
     * @Assert\NotBlank(message="Veuillez renseigner une note pour votre reservation")
     */
    private $rating;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="reviews")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"user:add_review"})
     * @Assert\NotNull(message="Veuillez renseignez le logement")
     */
    private $location;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;


    public function __construct()
    {
        
        $this->createdAt = new \DateTimeImmutable();
    
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getLocation(): ?Location
    {
        return $this->location;
    }

    public function setLocation(?Location $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}


// https://www.prestaconcept.net/blog/symfony/vichuploaderbundle-dry-configuration