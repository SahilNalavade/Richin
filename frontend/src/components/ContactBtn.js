import React from 'react';
import { Button, keyframes, usePrefersReducedMotion, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const waveAnimation = keyframes`
					0%{transform:rotate(0deg);}
					10%{transform:rotate(14deg);}
					20%{transform:rotate(-8deg);}
					30%{transform:rotate(14deg);}
					40%{transform:rotate(-4deg);}
					50%{transform:rotate(10deg);}
					60%{transform:rotate(0deg);}
					100%{transform:rotate(0deg);}
					`;

function Hand() {
	const prefersReducedMotion = usePrefersReducedMotion();
	const animation = prefersReducedMotion ? undefined : `${waveAnimation} infinite 2.5s`;
	return (
		<Text
			fontSize='1.2em'
			animation={animation}
			transformOrigin='70% 70%'
			display='inline-block'>
			👋
		</Text>
	);
}

export default function ContactBtn({ fontFamily, height, fontSize, mt, type }) {
	const router = useRouter();
	return (
		<Button
			type={type || 'button'}
			variant='outline'
			rightIcon={<Hand />}
			fontSize={fontSize || '1.4em'}
			size='lg'
			fontFamily={fontFamily || 'Poppins'}
			fontWeight='500'
			onClick={() => router.push('/contact')}
			_hover={{ bg: '#e8e8e8', color: '#0a0a0a' }}
			h={height || '56px'}
			mt={mt || 'none'}
			zIndex='999'
			bg='rgba(104, 104, 104, 0.4)'>
			Get in Touch
		</Button>
	);
}
