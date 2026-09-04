
'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
  Menu,
  Search,
  SlidersHorizontal,
  UserRound,
  X,
} from 'lucide-react'

const BASE_PATH = '/nest-real-estate-platform'

const images = {
  hero: `${BASE_PATH}/img1.jfif`,
  home: `${BASE_PATH}/img2.webp`,
  interior: `${BASE_PATH}/img3.webp`,
  img4: `${BASE_PATH}/img4.jpg`,
  img5: `${BASE_PATH}/img5.webp`,
  img6: `${BASE_PATH}/img6.jpg`,
  img7: `${BASE_PATH}/img7.jpg`,
}

type Property = {
  id: number
  title: string
  location: string
  price: string
  beds: number
  baths: number
  area: string
  tag: string
  photos: string[]
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Villa Solenne',
    location: 'Malibu, California',
    price: '$4,850,000',
    beds: 4,
    baths: 3,
    area: '3,240 sq ft',
    tag: 'Featured',
    photos: [images.hero, images.home, images.interior],
  },
  {
    id: 2,
    title: 'The Glass House',
    location: 'Austin, Texas',
    price: '$1,295,000',
    beds: 3,
    baths: 2,
    area: '2,180 sq ft',
    tag: 'New listing',
    photos: [images.img4, images.img5, images.img6],
  },
  {
    id: 3,
    title: 'No. 14 Penthouse',
    location: 'Miami, Florida',
    price: '$2,750,000',
    beds: 2,
    baths: 2,
    area: '1,890 sq ft',
    tag: 'Private listing',
    photos: [images.img7, images.interior, images.home],
  },
  {
    id: 4,
    title: 'Canyon Retreat',
    location: 'Scottsdale, Arizona',
    price: '$1,875,000',
    beds: 3,
    baths: 3,
    area: '2,760 sq ft',
    tag: 'Open house',
    photos: [images.img5, images.img6, images.img7],
  },
]

function AuthModal({
  onClose,
  onSignedIn,
}: {
  onClose: () => void
  onSignedIn: (name: string) => void
}) {
  const [mode, setMode] = useState<'sign in' | 'create account'>('sign in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)

    setTimeout(() => {
      onSignedIn(name || email.split('@')[0] || 'Member')
    }, 500)
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-primary/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-background p-7 shadow-2xl sm:p-10"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Welcome to NEST
            </p>

            <h2 id="auth-title" className="mt-3 font-serif text-4xl">
              {mode === 'sign in'
                ? 'Good to see you.'
                : 'Make yourself at home.'}
            </h2>
          </div>

          <button onClick={onClose} aria-label="Close sign in">
            <X />
          </button>
        </div>

        <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
          {mode === 'create account' && (
            <label className="text-sm">
              Your name

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl bg-secondary px-4 py-3 outline-none ring-primary focus:ring-2"
                placeholder="Alex Morgan"
              />
            </label>
          )}

          <label className="text-sm">
            Email address

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl bg-secondary px-4 py-3 outline-none ring-primary focus:ring-2"
              placeholder="you@example.com"
            />
          </label>

          <label className="text-sm">
            Password

            <input
              required
              minLength={6}
              type="password"
              className="mt-2 w-full rounded-xl bg-secondary px-4 py-3 outline-none ring-primary focus:ring-2"
              placeholder="••••••••"
            />
          </label>

          <button
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm text-primary-foreground"
            disabled={submitted}
          >
            {submitted
              ? 'Welcome to NEST'
              : mode === 'sign in'
                ? 'Sign in'
                : 'Create account'}

            {!submitted && <ArrowRight className="size-4" />}
          </button>
        </form>

        <button
          className="mt-6 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
          onClick={() =>
            setMode(mode === 'sign in' ? 'create account' : 'sign in')
          }
        >
          {mode === 'sign in'
            ? 'New to NEST? Create an account'
            : 'Already a member? Sign in'}
        </button>
      </div>
    </div>
  )
}

function PropertyCard({
  property,
  onOpen,
  saved,
  onSave,
}: {
  property: Property
  onOpen: () => void
  saved: boolean
  onSave: () => void
}) {
  const [photo, setPhoto] = useState(0)

  const next = (event: React.MouseEvent) => {
    event.stopPropagation()
    setPhoto((photo + 1) % property.photos.length)
  }

  const previous = (event: React.MouseEvent) => {
    event.stopPropagation()
    setPhoto(
      (photo + property.photos.length - 1) % property.photos.length
    )
  }

  return (
    <article
      className="group min-w-0 cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative aspect-[0.9] overflow-hidden rounded-2xl bg-secondary">
        <img
          src={property.photos[photo]}
          alt={`${property.title}, photo ${photo + 1}`}
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs">
          {property.tag}
        </span>

        <button
          onClick={(event) => {
            event.stopPropagation()
            onSave()
          }}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-background/90"
          aria-label={`${saved ? 'Remove' : 'Save'} ${property.title}`}
        >
          <Bookmark
            className={`size-4 ${
              saved ? 'fill-accent text-accent' : ''
            }`}
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 flex justify-between">
          <button
            onClick={previous}
            className="grid size-9 place-items-center rounded-full bg-background/90"
            aria-label="Previous property photo"
          >
            <ChevronLeft className="size-4" />
          </button>

          <span className="rounded-full bg-background/90 px-3 py-2 text-xs">
            {photo + 1} / {property.photos.length}
          </span>

          <button
            onClick={next}
            className="grid size-9 place-items-center rounded-full bg-background/90"
            aria-label="Next property photo"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <h3 className="font-serif text-2xl">
            {property.title}
          </h3>

          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3" />
            {property.location}
          </p>
        </div>

        <p className="pt-1 text-sm font-medium">
          {property.price}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <BedDouble className="size-3.5" />
          {property.beds} beds
        </span>

        <span className="flex items-center gap-1">
          <Bath className="size-3.5" />
          {property.baths} baths
        </span>

        <span>{property.area}</span>
      </div>
    </article>
  )
}

export default function Page() {
  const [search, setSearch] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [member, setMember] = useState('')
  const [active, setActive] = useState<Property | null>(null)
  const [detailPhoto, setDetailPhoto] = useState(0)

  const filtered = useMemo(
    () =>
      properties.filter((property) =>
        `${property.title} ${property.location}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  )

  const open = (property: Property) => {
    setActive(property)
    setDetailPhoto(0)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="mx-auto flex max-w-360 items-center justify-between px-5 py-5 md:px-10 lg:px-16">
        <a
          href="#top"
          className="flex items-center gap-3"
          aria-label="NEST home"
        >
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Home className="size-4" />
          </span>

          <span className="font-serif text-2xl tracking-tight">
            NEST<span className="text-accent">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a className="text-foreground" href="#discover">
            Discover
          </a>

          <a href="#properties">Properties</a>
          <a href="#journal">Journal</a>
          <a href="#agents">Our agents</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAuthOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm sm:flex"
          >
            <UserRound className="size-4" />
            {member || 'Sign in'}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid size-10 place-items-center rounded-full bg-secondary md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-y border-border px-5 py-5 text-sm md:hidden">
          <button
            className="self-start"
            onClick={() => {
              setAuthOpen(true)
              setMenuOpen(false)
            }}
          >
            Sign in / Create account
          </button>

          <a
            href="#discover"
            onClick={() => setMenuOpen(false)}
          >
            Discover
          </a>

          <a
            href="#properties"
            onClick={() => setMenuOpen(false)}
          >
            Properties
          </a>

          <a
            href="#journal"
            onClick={() => setMenuOpen(false)}
          >
            Journal
          </a>
        </nav>
      )}

      <section
        id="top"
        className="relative mx-auto max-w-360 overflow-hidden px-5 md:px-10 lg:px-16"
      >
        <div className="relative min-h-147.5 overflow-hidden rounded-[2rem] bg-primary md:min-h-162.5">
          <img
            src={images.hero}
            alt="Beautiful real estate property"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-[center_58%] opacity-100 contrast-110 saturate-105"
          />

          <div className="absolute inset-0 bg-linear-to-r from-primary/80 via-primary/10 to-transparent" />

          <div className="relative flex min-h-147.5 max-w-2xl flex-col justify-end gap-7 p-7 pb-40 md:min-h-162.5 md:p-14 md:pb-44">
            <p className="text-sm uppercase tracking-[0.28em] text-primary-foreground/75">
              Curated homes. Considered living.
            </p>

            <h1 className="max-w-xl font-serif text-5xl leading-[0.98] tracking-tight text-primary-foreground sm:text-6xl md:text-7xl">
              Find a place that feels like <em>you.</em>
            </h1>

            <p className="max-w-md text-base leading-7 text-primary-foreground/80">
              A more thoughtful way to discover exceptional homes,
              neighborhoods, and the life waiting inside them.
            </p>
          </div>

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-background p-3 shadow-2xl md:bottom-8 md:left-14 md:right-14 md:flex md:items-center md:gap-3 md:rounded-full">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-secondary px-5 py-4">
              <Search className="size-5 shrink-0 text-muted-foreground" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city, neighborhood, address"
                className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-expanded={filtersOpen}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm text-primary-foreground md:mt-0"
            >
              <SlidersHorizontal className="size-4" />
              Filters
            </button>

            <button
              onClick={() =>
                document
                  .getElementById('properties')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="mt-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-accent-foreground md:mt-0"
            >
              Search homes
            </button>
          </div>

          {filtersOpen && (
            <div className="absolute -bottom-32.5 left-5 right-5 z-10 rounded-2xl border border-border bg-background p-5 shadow-xl md:-bottom-30 md:left-auto md:right-14 md:w-80">
              <p className="text-sm font-medium">
                Property filters
              </p>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Use the search field to find homes by city,
                neighborhood, or property name.
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        id="discover"
        className="mx-auto max-w-360 px-5 py-20 md:px-10 md:py-28 lg:px-16"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              The NEST edit
            </p>

            <h2 className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
              Homes with a little more <em>character.</em>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            We look beyond the listing. These are spaces with a
            point of view, in places you will want to stay awhile.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} curated villas
          </p>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setCarouselIndex((index) => Math.max(0, index - 1))
              }
              disabled={carouselIndex === 0}
              className="grid size-11 place-items-center rounded-full border border-border disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous villas"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              onClick={() =>
                setCarouselIndex((index) =>
                  Math.min(
                    Math.max(0, filtered.length - 1),
                    index + 1
                  )
                )
              }
              disabled={
                carouselIndex >= Math.max(0, filtered.length - 1)
              }
              className="grid size-11 place-items-center rounded-full border border-border disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next villas"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div id="properties" className="mt-6 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${carouselIndex * 25}%)`,
            }}
          >
            {filtered.map((property) => (
              <div
                key={property.id}
                className="min-w-[85%] sm:min-w-[47%] lg:min-w-[23.5%]"
              >
                <PropertyCard
                  property={property}
                  onOpen={() => open(property)}
                  saved={favorites.includes(property.id)}
                  onSave={() =>
                    setFavorites((current) =>
                      current.includes(property.id)
                        ? current.filter(
                            (id) => id !== property.id
                          )
                        : [...current, property.id]
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journal" className="bg-secondary">
        <div className="mx-auto grid max-w-360 gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-10 md:py-28 lg:px-16">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              A better way home
            </p>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
              Space to live
              <br />
              <em>beautifully.</em>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
              From the first search to the final key, NEST pairs
              local knowledge with a more human approach to finding
              home.
            </p>
          </div>

          <img
            src={images.interior}
            alt="Bright modern home interior"
            className="aspect-[1.3] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section
        id="agents"
        className="mx-auto max-w-360 px-5 py-20 md:px-10 lg:px-16"
      >
        <div className="flex flex-col gap-8 rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-primary-foreground/60">
              Your next chapter
            </p>

            <h2 className="max-w-lg font-serif text-4xl md:text-5xl">
              Let&apos;s find the place that makes sense.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-primary-foreground/70">
              Sign in to save homes and connect with one of our
              local experts.
            </p>
          </div>

          <button
            onClick={() => setAuthOpen(true)}
            className="flex shrink-0 items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-sm text-accent-foreground"
          >
            {member ? 'View saved homes' : 'Talk to an expert'}

            <ArrowRight className="size-4" />
          </button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-360 flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-16">
          <p className="font-serif text-xl text-foreground">
            NEST<span className="text-accent">.</span>
          </p>

          <p>Thoughtful real estate for modern living.</p>

          <p>© 2026 NEST Realty</p>
        </div>
      </footer>

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onSignedIn={(name) => {
            setMember(name)
            setAuthOpen(false)
          }}
        />
      )}

      {active && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-primary/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} details`}
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-3xl bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden sm:aspect-16/8">
              <img
                src={active.photos[detailPhoto]}
                alt={`${active.title}, gallery image ${
                  detailPhoto + 1
                }`}
                className="size-full object-cover"
              />

              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-background/90"
                aria-label="Close property details"
              >
                <X />
              </button>

              <button
                onClick={() =>
                  setDetailPhoto(
                    (detailPhoto + active.photos.length - 1) %
                      active.photos.length
                  )
                }
                className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/90"
                aria-label="Previous property image"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={() =>
                  setDetailPhoto(
                    (detailPhoto + 1) % active.photos.length
                  )
                }
                className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/90"
                aria-label="Next property image"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="p-7 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {active.tag}
              </p>

              <h2 className="mt-2 font-serif text-4xl">
                {active.title}
              </h2>

              <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {active.location}
              </p>

              <div className="mt-7 flex flex-wrap gap-5 border-y border-border py-5 text-sm">
                <span>{active.beds} beds</span>
                <span>{active.baths} baths</span>
                <span>{active.area}</span>
                <span className="font-medium">
                  {active.price}
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
                A considered home with generous proportions,
                natural light, and details that reward a closer look.
                Explore every angle, then save it to your NEST
                shortlist.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}