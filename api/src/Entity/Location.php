<?php

namespace App\Entity;

use App\Repository\LocationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\RangeFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
*  @ApiResource(collectionOperations={
 *     "get"={
 *          "path":"/All/locations",
 *          "normalization_context"={"groups"={"read:all_thematics"}}
 *  },
 *     "post"={
 *         "controller"=App\Controller\Api\AddLocationController::class,
 *         "security"="is_granted('ROLE_OWNER')",
 *         "defaults"={"_api_receive"=false},
 *         "swagger_context" = {
 *            "consumes" = {
 *                "multipart/form-data",
 *             }
 *         }    
 *     },
 *  "admin_read_locations"={
 *  "method"="GET",
 *  "path"="/admin/locations",
 * "normalization_context"={"groups"={"admin:read"}}
 * }
 * },
 * itemOperations={
 * "patch"={"security"="is_granted('ROLE_ADMIN')"},
 * "read_location"={
 *  "method"="GET",
 *  "path"="/All/locations/{id}",
 *  "normalization_context"={"groups"={"read:location"}}
 * }})
 * @ApiFilter(SearchFilter::class, properties={"category": "exact","user": "exact",
 * "thematics":"exact","status":"exact","destination":"exact","city":"partial","street":"partial"})
 *  @ApiFilter(RangeFilter::class, properties={"travelers","price"})
 * 
 * @ApiFilter(DateFilter::class, properties={"bookings.dateDebut","bookings.dateFin"})
 * 
 * @ORM\Entity(repositoryClass=LocationRepository::class)
 */
class Location
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"admin:read","read:all_thematics","read:location","read:user_bookings"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"admin:read","read:all_thematics","read:location","read:user_bookings"})
     * @Assert\NotBlank(message="Veuillez renseigner le nom de l'hébergement")
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     * @Groups({"admin:read","read:all_thematics","read:location"})
     * @Assert\NotBlank(message="Veuillez renseigner la description de cet hébergement")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:all_thematics","read:location"})
     * @Assert\NotBlank(message="Veuillez renseigner la rue")
     */
    private $street;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:all_thematics","read:location"})
     * @Assert\NotBlank(message="Veuillez renseigner le code postal")
     */
    private $postal_code;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:all_thematics","read:location"})
     * @Assert\NotBlank(message="Veuillez renseigner la ville")
     */
    private $city;

    /**
     * @ORM\Column(type="float")
     * @Groups({"read:all_thematics","read:location","read:user_bookings"})
     * @Assert\GreaterThan(
     *     value = 0,
     *     message ="Le prix doit etre superieur a 0"
     * )
     */
    private $price;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read:all_thematics","read:location"})
     * @Assert\GreaterThan(
     *     value = 0,
     *     message ="Le nombre de chambre doit etre superieur a 0"
     * )
     */
    private $rooms;

    /**
     * @ORM\Column(type="float")
     * @Groups({"read:all_thematics","read:location"})
     * @Assert\GreaterThan(
     *     value = 0,
     *     message ="La surface doit etre renseignée"
     * )
     */
    private $surface;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read:all_thematics","read:location"})
     * @Assert\GreaterThan(
     *     value = 0,
     *     message ="Vous devez renseigner le nombre de voyageurs que peut accueillir l'hébergement"
     * )
     */
    private $travelers;

    /**
     * @ORM\OneToMany(targetEntity=Image::class, mappedBy="location", orphanRemoval=true,cascade={"persist"})
     * @Groups({"read:all_thematics","read:location","read:user_bookings"})
     * @Assert\Count(min=1,minMessage="Vous devez renseignez au moins une image pour votre location")
     */
    private $images;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="locations")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"admin:read"})
     * @Assert\NotNull(message="Veuillez renseignez la categorie à laquelle appartient votre hébergement")
     */
    private $category;


    private $rating;

    /**
     * @ORM\ManyToOne(targetEntity=Destination::class, inversedBy="locations")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotNull(message="Veuillez renseignez la région dans laquelle se trouve votre hébergement")
     */
    private $destination;

    /**
     * @ORM\OneToMany(targetEntity=FieldValue::class, mappedBy="location",cascade={"persist"}, orphanRemoval=true)
     * @Groups({"read:location"})
     */
    private $fieldValues;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read:all_thematics","read:location"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="locations")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:user_bookings","read:location"})
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity=Activity::class, mappedBy="location", orphanRemoval=true)
     * @Groups({"read:all_thematics"})
     */
    private $activities;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"admin:read","read:all_thematics"})
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity=Review::class, mappedBy="location", orphanRemoval=true)
     * @Groups({"admin:read","read:all_thematics","read:location"})
     */
    private $reviews;

    /**
     * @ORM\ManyToMany(targetEntity=Thematic::class, inversedBy="locations")
     * @Assert\Count(min=1,minMessage="Veuillez renseigner au moins une thematique pour votre hébergement")
     * 
     */
    private $thematics;
    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="locations")
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Booking::class, mappedBy="location")
     * @Groups({"read:all_thematics"})
     */
    private $bookings;



    public function __construct($num)
    {
        $this->images = new ArrayCollection();
        $this->fieldValues = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->activities = new ArrayCollection();
        $this->travelers=$num;
        $this->status=0;
        $this->reviews = new ArrayCollection();
        $this->thematics = new ArrayCollection();

        $this->comments = new ArrayCollection();
        $this->bookings = new ArrayCollection();

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

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): self
    {
        $this->street = $street;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postal_code;
    }

    public function setPostalCode(string $postal_code): self
    {
        $this->postal_code = $postal_code;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

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

    public function getRooms(): ?int
    {
        return $this->rooms;
    }

    public function setRooms(int $rooms): self
    {
        $this->rooms = $rooms;

        return $this;
    }

    public function getSurface(): ?float
    {
        return $this->surface;
    }

    public function setSurface(float $surface): self
    {
        $this->surface = $surface;

        return $this;
    }

    public function getTravelers(): ?int
    {
        return $this->travelers;
    }

    public function setTravelers(int $travelers): self
    {
        $this->$travelers = $travelers;

        return $this;
    }

    /**
     * @return Collection|Image[]
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setLocation($this);
        }

        return $this;
    }

    public function removeImage(Image $image): self
    {
        if ($this->images->contains($image)) {
            $this->images->removeElement($image);
            // set the owning side to null (unless already changed)
            if ($image->getLocation() === $this) {
                $image->setLocation(null);
            }
        }

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

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

    public function getDestination(): ?Destination
    {
        return $this->destination;
    }

    public function setDestination(?Destination $destination): self
    {
        $this->destination = $destination;

        return $this;
    }

    /**
     * @return Collection|FieldValue[]
     */
    public function getFieldValues(): Collection
    {
        return $this->fieldValues;
    }

    public function addFieldValue(FieldValue $fieldValue): self
    {
        if (!$this->fieldValues->contains($fieldValue)) {
            $this->fieldValues[] = $fieldValue;
            $fieldValue->setLocation($this);
        }

        return $this;
    }

    public function removeFieldValue(FieldValue $fieldValue): self
    {
        if ($this->fieldValues->contains($fieldValue)) {
            $this->fieldValues->removeElement($fieldValue);
            // set the owning side to null (unless already changed)
            if ($fieldValue->getLocation() === $this) {
                $fieldValue->setLocation(null);
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Activity[]
     */
    public function getActivities(): Collection
    {
        return $this->activities;
    }

    public function addActivity(Activity $activity): self
    {
        if (!$this->activities->contains($activity)) {
            $this->activities[] = $activity;
            $activity->setLocation($this);
        }

        return $this;
    }

    public function removeActivity(Activity $activity): self
    {
        if ($this->activities->contains($activity)) {
            $this->activities->removeElement($activity);
            // set the owning side to null (unless already changed)
            if ($activity->getLocation() === $this) {
                $activity->setLocation(null);
            }
        }

        return $this;
    }


    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection|Review[]
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setLocation($this);
        }
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
            $comment->setLocations($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->contains($review)) {
            $this->reviews->removeElement($review);
            // set the owning side to null (unless already changed)
            if ($review->getLocation() === $this) {
                $review->setLocation(null);
            }
        }
        return $this;
    }
    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getLocations() === $this) {
                $comment->setLocations(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Thematic[]
     */
    public function getThematics(): Collection
    {
        return $this->thematics;
    }

    public function addThematic(Thematic $thematic): self
    {
        if (!$this->thematics->contains($thematic)) {
            $this->thematics[] = $thematic;
        }
        return $this;
    }
     /**
     * @return Collection|Booking[]
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): self
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings[] = $booking;
            $booking->setLocation($this);
        }

        return $this;
    }

    public function removeThematic(Thematic $thematic): self
    {
        if ($this->thematics->contains($thematic)) {
            $this->thematics->removeElement($thematic);
        }
        return $this;
    }
    public function removeBooking(Booking $booking): self
    {
        if ($this->bookings->contains($booking)) {
            $this->bookings->removeElement($booking);
            // set the owning side to null (unless already changed)
            if ($booking->getLocation() === $this) {
                $booking->setLocation(null);
            }
        }

        return $this;
    }
}
