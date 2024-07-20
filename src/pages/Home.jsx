import ProductGrid from '@/components/Home/ProductGrid'
import PromotionCarousel from '@/components/Home/PromotionCarousel'
import { getRandomWelcomeMessage } from '@/components/Home/welcomeMesseges'
import PageTitle from '@/components/PageTitle'
import React from 'react'

function Home() {
  return (
    <>
    <PromotionCarousel />
    <PageTitle title={getRandomWelcomeMessage()} />
    <ProductGrid />
    </>
  )
}

export default Home