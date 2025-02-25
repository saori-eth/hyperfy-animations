import { Container, Root, Text, Svg } from '@react-three/uikit'
import { Card, List, ListItem } from './uikit'
import { useScroll } from '@react-three/drei'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

export const GUI = () => {
  const tl = useRef<GSAPTimeline>()
  const gui = useRef<Group>(null)
  const scroll = useScroll()
  useFrame(() => {
    if (!tl.current) return
    tl.current.seek(scroll.offset * tl.current.duration())
  })
  useLayoutEffect(() => {
    if (!gui.current) return
    tl.current = gsap.timeline()
    tl.current.to(gui.current.position, {
      duration: 0.5,
      y: 5,
    })
  }, [])
  return (
    <group position={[0.7, 1.25, -0.25]} rotation={[0, -0.25, 0]} ref={gui}>
      <group position={[0, 0, 0]}>
        <Intro />
      </group>
      <group position={[0, -1.875, 0]}>
        <Skills />
      </group>
      <group position={[0, -3.75, 0]}>
        <Projects />
      </group>
    </group>
  )
}

const Intro = () => {
  return (
    <Root sizeX={0.75} sizeY={0.5}>
      <Card
        width={'100%'}
        height={'95%'}
        padding={15}
        alignItems={'flex-start'}
        justifyContent={'space-evenly'}
      >
        <Text fontWeight={'bold'} fontSize={24}>
          Hey, I'm Saori!
        </Text>
        <Text>
          I'm currently working for the internet. Half of my time is spent
          building and the other half is investing in builders.
        </Text>
        <Text>
          I'm very interested in the future of 3d web, web3 and asset
          interoperability via NFTs.
        </Text>
      </Card>
      <Container flexDirection={'row'} justifyContent={'center'}>
        <Text fontSize={12} paddingTop={5}>
          Scroll
        </Text>
        <Svg
          src="icon/down.svg"
          width={20}
          color={'white'}
          paddingLeft={5}
          paddingTop={5}
        />
      </Container>
    </Root>
  )
}

interface SkillsListType {
  [category: string]: string[]
}

const SkillsList: SkillsListType = {
  Frontend: [
    'React',
    'Three.js',
    'React Three Fiber',
    'Next.js',
    'Vite',
    'TypeScript',
    'Drizzle ORM',
    'ethers.js',
    'Viem',
    'WAGMI',
    'Tailwind CSS',
    'Web3.js (Solana)',
    'pixiv/three-vrm',
  ],
  Backend: [
    'Node.js',
    'Express',
    'SQLite',
    'MySQL',
    'Solidity',
    'Hardhat',
    'Foundry (Forge / Anvil)',
    'Discord.js',
    'Telgraf',
  ],
}

const Skills = () => {
  return (
    <Root sizeX={1} sizeY={0.75}>
      <Card
        width={'100%'}
        height={'100%'}
        padding={15}
        alignItems={'flex-start'}
      >
        <Text fontWeight={'bold'} fontSize={24} paddingBottom={20}>
          Skills
        </Text>
        <Container
          flexDirection={'row'}
          justifyContent={'space-between'}
          paddingX={15}
        >
          {Object.keys(SkillsList).map((category) => (
            <Container
              flexDirection={'column'}
              paddingX={30}
              key={`category-${category}`}
            >
              <Text fontWeight={'bold'}>{category}</Text>
              {SkillsList[category].map((skill) => (
                <Text key={`skill-${skill}`}>- {skill}</Text>
              ))}
            </Container>
          ))}
        </Container>
      </Card>
    </Root>
  )
}

const Projects = () => {
  return (
    <Root>
      <Card width={'100%'} height={'95%'} padding={15}>
        <Text fontWeight={'bold'} fontSize={24} paddingBottom={20}>
          Projects
        </Text>
        <List type="plain" width={400}>
          <ListItem
            subtitle={
              <Text>Documentation / Contributor Coordination 2021</Text>
            }
            onPointerDown={() =>
              window.open('https://github.com/yearn/yearn-docs')
            }
          >
            <Text>Yearn Finance</Text>
          </ListItem>
          <ListItem
            subtitle={<Text>Developer 2022-2023</Text>}
            onPointerDown={() => window.open('https://hyperfy.io')}
          >
            <Text>Hyperfy</Text>
          </ListItem>
          <ListItem subtitle={<Text>Trading / Bots 2023-2024</Text>}>
            <Text>Self Employed</Text>
          </ListItem>
        </List>
      </Card>
    </Root>
  )
}
