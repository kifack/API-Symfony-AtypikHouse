<?php

namespace App\Entity;

use App\Repository\ActivityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 *  @ApiResource( collectionOperations={
 *    "get"={
 *          "path":"/All/activities",
 *          "normalization_context"={"groups"={"read:all_activities"}}
 *  },
 *     "post"={
 *         "controller"=App\Controller\Api\AddActivityController::class,
 *         "defaults"={"_api_receive"=false},
 *         "swagger_context" = {
 *            "consumes" = {
 *                "multipart/form-data",
 *             }
 *         }
 *     },
 * })
 * @ORM\Entity(repositoryClass=ActivityRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"location": "exact"})
 */
class Activity
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:all_activities"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"read:all_activities"})
     * @Assert\NotBlank(message="Veuillez renseigner la description de l'activité autour")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:all_activities"})
     * @Assert\GreaterThan(
     *     value = 0,
     *     message ="Veuillez renseigner la distance de l'hébergement"
     * )
     */
    private $distance;

    /**
     * @ORM\Column(type="float",nullable=true,options={"default" : 0})
     * @Groups({"read:all_activities"})
     * @Assert\NotBlank(message="Veuillez renseigner le prix de l'activité")
     * @Assert\GreaterThan(
     *     value = 0,
     *     message ="Le prix doit etre superieur a 0"
     * )
     */
    private $price;

    /**
     * @ORM\OneToMany(targetEntity=ImageActivity::class, mappedBy="activity", orphanRemoval=true)
     * @Groups({"read:all_activities"})
     * @Assert\Count(min=1,minMessage="Vous devez renseignez au moins une image")
     */
    private $images;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="activities")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotNull(message="Veuillez renseigner la location pour cette activité")
     */
    private $location;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="activities")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read:all_activities"})
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="activities")
     */
    private $comments;

    public function __construct()
    {
        $this->images = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDistance(): ?string
    {
        return $this->distance;
    }

    public function setDistance(string $distance): self
    {
        $this->distance = $distance;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection|ImageActivity[]
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(ImageActivity $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setActivity($this);
        }

        return $this;
    }

    public function removeImage(ImageActivity $image): self
    {
        if ($this->images->contains($image)) {
            $this->images->removeElement($image);
            // set the owning side to null (unless already changed)
            if ($image->getActivity() === $this) {
                $image->setActivity(null);
            }
        }

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setActivities($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getActivities() === $this) {
                $comment->setActivities(null);
            }
        }

        return $this;
    }

}
