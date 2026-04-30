export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Role = 'client' | 'caregiver' | 'admin'

export type PetType = 'dog' | 'cat' | 'bird' | 'other'
export type PetSize = 'small' | 'medium' | 'large'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Profile {
  id: string
  role: Role
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  address: string | null
  bio: string | null
  created_at: string
}

export interface Caregiver {
  profile_id: string
  specialties: string[]
  availability: Json
  hourly_rate: number | null
  service_types: string[]
  is_verified: boolean
  average_rating: number | null
}

export interface Pet {
  id: string
  owner_id: string | null
  name: string | null
  type: PetType | null
  breed: string | null
  size: PetSize | null
  age_months: number | null
  notes: string | null
  photo_url: string | null
}

export interface Service {
  id: string
  name: string
  description: string | null
  base_price: number
  price_unit: string
  duration_minutes: number | null
  icon: string | null
  is_active: boolean
}

export interface Booking {
  id: string
  client_id: string | null
  caregiver_id: string | null
  service_id: string | null
  pet_id: string | null
  start_date: string | null
  end_date: string | null
  status: BookingStatus | null
  total_price: number | null
  notes: string | null
  created_at: string
}

export interface Review {
  id: string
  booking_id: string | null
  rating: number | null
  comment: string | null
  created_at: string
}

export interface Message {
  id: string
  sender_id: string | null
  receiver_id: string | null
  content: string | null
  read_at: string | null
  created_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribed_at: string
  is_active: boolean
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      caregivers: {
        Row: Caregiver
        Insert: Caregiver
        Update: Partial<Caregiver>
      }
      pets: {
        Row: Pet
        Insert: Omit<Pet, 'id'>
        Update: Partial<Omit<Pet, 'id'>>
      }
      services: {
        Row: Service
        Insert: Omit<Service, 'id'>
        Update: Partial<Omit<Service, 'id'>>
      }
      bookings: {
        Row: Booking
        Insert: Omit<Booking, 'id' | 'created_at'>
        Update: Partial<Omit<Booking, 'id' | 'created_at'>>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'created_at'>
        Update: Partial<Omit<Review, 'id' | 'created_at'>>
      }
      messages: {
        Row: Message
        Insert: Omit<Message, 'id' | 'created_at'>
        Update: Partial<Omit<Message, 'id' | 'created_at'>>
      }
      newsletter_subscribers: {
        Row: NewsletterSubscriber
        Insert: Omit<NewsletterSubscriber, 'id' | 'subscribed_at'>
        Update: Partial<Omit<NewsletterSubscriber, 'id' | 'subscribed_at'>>
      }
    }
  }
}
