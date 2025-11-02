'use client';

import Image from "next/image"
import Link from "next/link"
import { Button, Container, Typography, Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface HeroProps {
  imageSrc?: string
  title?: string
  subtitle?: string
  showCTA?: boolean
}

export default function Hero({ imageSrc = "", title, subtitle, showCTA = false }: HeroProps) {
  return (
    <section className="relative h-[500px] md:h-[600px]">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/80 to-stone-900/40 z-10"></div>
      <Image src={imageSrc} alt="Hero Banner" fill className="object-cover" />
      <div className="relative z-20 h-full flex flex-col justify-center">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 300
                }}
              >
                {subtitle}
              </Typography>
            )}
            {showCTA && (
              <Box sx={{ mt: 4 }}>
                <Button
                  component={Link}
                  href="/contact"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Get Started Today
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </div>
    </section>
  )
}

