<?php

namespace App\Entity;

use App\Repository\DestinationRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 *  @ApiResource(iri="http://schema.org/MediaObject", collectionOperations={
 *     "get"={
 *          "path":"/All/destinations"
 *  },
 *     "post"={
 *         "security"="is_granted('ROLE_ADMIN')",
 *         "controller"=App\Controller\Api\AddDestinationController::class,
 *         "defaults"={"_api_receive"=false},
 *         "swagger_context" = {
 *            "consumes" = {
 *                "multipart/form-data",
 *             }
 *         }
 *     },
 *  "admin_read_destinations"={
 *   "method"="GET",
 *   "security"="is_granted('ROLE_ADMIN')",
 *    "path"="/admin/destinations",
 *   "normalization_context"={"groups"={"admin:read_destinations"}}
 * }
 * })
 * @ORM\Entity(repositoryClass=DestinationRepository::class)
 * @Vich\Uploadable
 */
class Destination
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"admin:read_destinations"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"admin:read_destinations"})
     * @Assert\NotBlank(message="Veuillez entrer le lieu de la destination")
     */
    private $address;

    /**
     * @ORM\Column(type="text")
     * @Groups({"admin:read_destinations"})
     * @Assert\NotBlank(message="Veuillez renseigner la description du lieu")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"admin:read_destinations"})
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
     * @Vich\UploadableField(mapping="destinations", fileNameProperty="fileName")
     * 
     * @var File|null
     */
    private $imageFile;

    /**
     * @ORM\OneToMany(targetEntity=Location::class, mappedBy="destination", orphanRemoval=true)
     */
    private $locations;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"admin:read_destinations"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="destinations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $author;

    public function __construct()
    {
        $this->locations = new ArrayCollection();
    }


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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

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

    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    public function setFileName(string $fileName): self
    {
        $this->fileName = $fileName;

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
            $location->setDestination($this);
        }

        return $this;
    }

    public function removeLocation(Location $location): self
    {
        if ($this->locations->contains($location)) {
            $this->locations->removeElement($location);
            // set the owning side to null (unless already changed)
            if ($location->getDestination() === $this) {
                $location->setDestination(null);
            }
        }

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
