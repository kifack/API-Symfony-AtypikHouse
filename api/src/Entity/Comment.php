<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ApiResource(collectionOperations={
 * "post" ={"denormalization_context"={"groups"={"user:add_comment"}}},
 * "read_all_comments"={
 * "method"="GET",
 *  "path"="/All/comments",
 *  "normalization_context"={"groups"={"read:all_comments"}}
 * }
 * },
 * itemOperations={"get","put","delete"={ "security"="is_granted('ROLE_ADMIN')"}
 * ,"patch" ={
 * "security"="is_granted('ROLE_ADMIN')"
 * }},
 * normalizationContext={"groups"={"comment:read"}},
 * denormalizationContext={"groups"={"comment:write"}},
 * )
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 * @ApiFilter(BooleanFilter::class, properties={"status"})
 * @ApiFilter(SearchFilter::class, properties={"locations": "exact","activities":"exact"})
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"comment:read","read:all_comments"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"comment:read", "comment:write","read:all_comments","user:add_comment"})
     *  @Assert\NotBlank(message="Veuillez renseigner le contenu pour votre commentaire")
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"comment:read", "comment:write","read:all_comments","user:add_comment"})
     * @Assert\NotNull(message="Veuillez renseignez l'utilisateur")
     */
    private $author;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="comments")
     * @Groups({"comment:read", "comment:write","user:add_comment"})
     */
    private $locations;

    /**
     * @ORM\ManyToOne(targetEntity=Activity::class, inversedBy="comments")
     * @Groups({"comment:read", "comment:write","user:add_comment"})
     */
    private $activities;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"comment:read", "comment:write","read:all_comments"})
     */
    private $dateCreated;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"comment:read", "comment:write"})
     */
    private $dateModified;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"comment:read", "comment:write","read:all_comments"})
     */
    private $status;
  
    public function __construct()
    {
        $this->status =true;
        $this->dateCreated = new \DateTimeImmutable();
        $this->dateModified = new \DateTimeImmutable();
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getLocations(): ?Location
    {
        return $this->locations;
    }

    public function setLocations(?Location $locations): self
    {
        $this->locations = $locations;

        return $this;
    }

    public function getActivities(): ?Activity
    {
        return $this->activities;
    }

    public function setActivities(?Activity $activities): self
    {
        $this->activities = $activities;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    public function getDateModified(): ?\DateTimeInterface
    {
        return $this->dateModified;
    }

    public function setDateModified(?\DateTimeInterface $dateModified): self
    {
        $this->dateModified = $dateModified;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }
}
