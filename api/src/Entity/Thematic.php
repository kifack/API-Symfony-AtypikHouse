<?php

namespace App\Entity;

use App\Repository\ThematicRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(iri="http://schema.org/MediaObject", collectionOperations={
 *      "get"={
 *          "path":"/All/thematics"
 *  },
 *     "post"={
 *         "security"="is_granted('ROLE_ADMIN')",
 *         "controller"=App\Controller\Api\AddThematicController::class,
 *         "defaults"={"_api_receive"=false},
 *         "swagger_context" = {
 *            "consumes" = {
 *                "multipart/form-data",
 *             }
 *         }
 *     },
 *   "admin_read_thematics"={
 *   "method"="GET",
 *   "security"="is_granted('ROLE_ADMIN')",
 *    "path"="/admin/thematics",
 *   "normalization_context"={"groups"={"admin:read_thematics"}}
 * }
 * })
 * @ORM\Entity(repositoryClass=ThematicRepository::class)
 * @Vich\Uploadable
 */
class Thematic
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user:read","admin:read_thematics"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read","admin:read_thematics"})
     * @Assert\NotBlank(message="Veuillez renseignez le nom de la thématique")
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups({"user:read","admin:read_thematics"})
     * @Assert\NotBlank(message="Veuillez renseignez une description pour cette thématique")
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"user:read","admin:read_thematics"})
     */
    private $createdAt;

    

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read","admin:read_thematics"})
     */
    private $fileName;

    /**
     * @Assert\File(
     *   maxSize = "2048k",
     *   maxSizeMessage = "Le fichier a dépassé la taille maximale",
     *   mimeTypes = {"image/png","image/jpeg","image/jpg"},
     *   mimeTypesMessage = "Selectionner un fichier au format  png/jpeg/jpg "
     * )
     * @Assert\NotNull(message="Veuillez renseigner une image")
     * @Vich\UploadableField(mapping="thematics", fileNameProperty="fileName")
     * 
     * @var File|null
     */
    private $imageFile;

    public function __construct()
    {
        $this->locations = new ArrayCollection();
    }

    private $rating;

    /**
     * @ORM\ManyToMany(targetEntity=Location::class, mappedBy="thematics")
     */
    private $locations;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="thematics")
     * @ORM\JoinColumn(nullable=false)
     */
    private $author;

    
      /**
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile
     */
    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->createdAt = new \DateTimeImmutable();
        }
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }


    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    public function setFileName(string $fileName): self
    {
        $this->fileName = $fileName;

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

    /**
     * @return Collection|Location[]
     */
    public function getLocations(): Collection
    {
        return $this->locations;
    }

    public function addLocation(Location $location): self
    {
        if (!$this->locations->contains($location)) {
            $this->locations[] = $location;
            $location->addThematic($this);
        }

        return $this;
    }

    public function removeLocation(Location $location): self
    {
        if ($this->locations->contains($location)) {
            $this->locations->removeElement($location);
            $location->removeThematic($this);
        }

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
}
