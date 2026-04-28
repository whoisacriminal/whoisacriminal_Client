import { useEffect, useRef, useState } from 'react'
import './Intro.css'
import bgMain from '../assets/intro/bg-main.png'
import titleWho from '../assets/intro/title-who.svg'
import magnifier from '../assets/intro/magnifier.png'
import marker1 from '../assets/intro/marker1.png'
import marker2 from '../assets/intro/marker2.png'
import marker3 from '../assets/intro/marker3.png'
import laptop from '../assets/intro/laptop.png'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function DecorativeAsset({ className, floatClass, src, alt, style }) {
	return (
		<div className={`decor ${className}`} style={style} aria-hidden="true">
			<div className={`decor-float ${floatClass}`}>
				<img src={src} alt={alt} draggable="false" />
			</div>
		</div>
	)
}

function Intro({ onPlay }) {
	const shellRef = useRef(null)
	const pressTimeoutRef = useRef(null)
	const [isReady, setIsReady] = useState(false)
	const [isPressed, setIsPressed] = useState(false)
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

	useEffect(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)')
		const updateMotionPreference = () => setPrefersReducedMotion(media.matches)

		updateMotionPreference()

		if (typeof media.addEventListener === 'function') {
			media.addEventListener('change', updateMotionPreference)

			return () => media.removeEventListener('change', updateMotionPreference)
		}

		media.addListener(updateMotionPreference)

		return () => media.removeListener(updateMotionPreference)
	}, [])

	useEffect(() => {
		const frame = window.requestAnimationFrame(() => setIsReady(true))

		return () => window.cancelAnimationFrame(frame)
	}, [])

	useEffect(() => {
		return () => {
			if (pressTimeoutRef.current) {
				window.clearTimeout(pressTimeoutRef.current)
			}
		}
	}, [])

	const updateParallax = (event) => {
		if (!shellRef.current || prefersReducedMotion) {
			return
		}

		const shell = shellRef.current
		const rect = shell.getBoundingClientRect()

		if (!rect.width || !rect.height) {
			return
		}

		const rawX = (event.clientX - rect.left) / rect.width
		const rawY = (event.clientY - rect.top) / rect.height
		const x = clamp(rawX, 0, 1)
		const y = clamp(rawY, 0, 1)

		shell.style.setProperty('--pointer-x', `${(x - 0.5) * 2}`)
		shell.style.setProperty('--pointer-y', `${(y - 0.5) * 2}`)
	}

	const resetParallax = () => {
		if (!shellRef.current) {
			return
		}

		shellRef.current.style.setProperty('--pointer-x', '0')
		shellRef.current.style.setProperty('--pointer-y', '0')
	}

	const handlePlayClick = () => {
		setIsPressed(true)

		if (pressTimeoutRef.current) {
			window.clearTimeout(pressTimeoutRef.current)
		}

		pressTimeoutRef.current = window.setTimeout(() => {
			setIsPressed(false)
			pressTimeoutRef.current = null
			if (typeof onPlay === 'function') {
				onPlay()
			}
		}, 140)
	}

	const stageClassName = [
		'intro-shell',
		isReady ? 'is-mounted' : '',
		prefersReducedMotion ? 'reduce-motion' : '',
	]
		.filter(Boolean)
		.join(' ')

	return (
		<main
			ref={shellRef}
			className={stageClassName}
			style={{
				'--intro-backdrop': `url(${bgMain})`,
			}}
			onPointerMove={updateParallax}
			onPointerLeave={resetParallax}
		>
			<div className="shell-backdrop" aria-hidden="true" />
			<section className="intro-stage" aria-label="Detective exhibition intro">
				<img className="intro-background" src={bgMain} alt="" aria-hidden="true" draggable="false" />
				<div className="intro-glow" aria-hidden="true" />
				<div className="intro-vignette" aria-hidden="true" />

				<DecorativeAsset
					className="decor-magnifier"
					floatClass="float-lens"
					src={magnifier}
					alt=""
					style={{
						'--enter-delay': '120ms',
						'--parallax-x': '14px',
						'--parallax-y': '10px',
						'--hover-scale': '1.06',
						'--tilt': '-16deg',
					}}
				/>
				<DecorativeAsset
					className="decor-marker decor-marker-1"
					floatClass="float-marker-a"
					src={marker1}
					alt=""
					style={{
						'--enter-delay': '170ms',
						'--parallax-x': '8px',
						'--parallax-y': '6px',
						'--hover-scale': '1.1',
						'--tilt': '-9deg',
					}}
				/>
				<DecorativeAsset
					className="decor-marker decor-marker-2"
					floatClass="float-marker-b"
					src={marker2}
					alt=""
					style={{
						'--enter-delay': '240ms',
						'--parallax-x': '9px',
						'--parallax-y': '7px',
						'--hover-scale': '1.1',
						'--tilt': '10deg',
					}}
				/>
				<DecorativeAsset
					className="decor-marker decor-marker-3"
					floatClass="float-marker-c"
					src={marker3}
					alt=""
					style={{
						'--enter-delay': '300ms',
						'--parallax-x': '11px',
						'--parallax-y': '8px',
						'--hover-scale': '1.1',
						'--tilt': '7deg',
					}}
				/>
				<DecorativeAsset
					className="decor-laptop"
					floatClass="float-laptop"
					src={laptop}
					alt=""
					style={{
						'--enter-delay': '360ms',
						'--parallax-x': '7px',
						'--parallax-y': '5px',
						'--hover-scale': '1.05',
						'--tilt': '-5deg',
					}}
				/>

				<div className="intro-content">
					<img className="intro-title" src={titleWho} alt="Who Is Criminal" draggable="false" />
					<p className="intro-subtitle">
						{'완벽해 보이는 알리바이 뒤에 숨은\n모순을 찾아 범인의 정체를 밝혀내세요.'}
					</p>
					<button
						type="button"
						onClick={handlePlayClick}
						aria-label="Play Game"
						className={`play-btn ${isPressed ? 'is-pressed' : ''}`}
					>
						<span className="play-btn-main">Play Game</span>
						<span className="play-btn-sub" aria-hidden="true">
							Start Investigation
						</span>
					</button>
				</div>
			</section>
		</main>
	)
}

export default Intro
