import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    const W = () => canvas.width
    const H = () => canvas.height
    const PURPLE = '155,109,255'
    const GREEN  = '74,222,128'
    const RED    = '248,113,113'

    // ─────────────────────────────────────────
    // 1. PERSPECTIVE GRID (infinite trading floor)
    // ─────────────────────────────────────────
    const drawPerspectiveGrid = () => {
      const vx = W() / 2
      const vy = H() * 0.48
      const COLS = 14
      const ROWS = 18
      const spread = W() * 0.95
      const depth  = H() * 0.52

      // Vertical lines (left to right, converging to vanishing point)
      for (let i = 0; i <= COLS; i++) {
        const t    = i / COLS
        const botX = (t - 0.5) * spread + vx
        const d    = Math.abs(t - 0.5)
        const op   = (0.18 - d * 0.22) * (0.6 + 0.4 * Math.sin(time * 0.5 + i * 0.3))
        if (op <= 0) continue

        const grad = ctx.createLinearGradient(vx, vy, botX, vy + depth)
        grad.addColorStop(0, `rgba(${PURPLE},0)`)
        grad.addColorStop(0.3, `rgba(${PURPLE},${op})`)
        grad.addColorStop(1, `rgba(${PURPLE},${op * 0.3})`)

        ctx.beginPath()
        ctx.moveTo(vx, vy)
        ctx.lineTo(botX, vy + depth)
        ctx.strokeStyle = grad
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Horizontal lines (receding into distance)
      for (let j = 1; j <= ROWS; j++) {
        const t  = Math.pow(j / ROWS, 1.6)
        const y  = vy + t * depth
        const hw = (t * spread) / 2
        const op = t * 0.22 * (0.7 + 0.3 * Math.sin(time * 0.4 + j * 0.5))

        const grad = ctx.createLinearGradient(vx - hw, y, vx + hw, y)
        grad.addColorStop(0,   `rgba(${PURPLE},0)`)
        grad.addColorStop(0.1, `rgba(${PURPLE},${op})`)
        grad.addColorStop(0.5, `rgba(${PURPLE},${op * 1.4})`)
        grad.addColorStop(0.9, `rgba(${PURPLE},${op})`)
        grad.addColorStop(1,   `rgba(${PURPLE},0)`)

        ctx.beginPath()
        ctx.moveTo(vx - hw, y)
        ctx.lineTo(vx + hw, y)
        ctx.strokeStyle = grad
        ctx.lineWidth = j === ROWS ? 1.2 : 0.7
        ctx.stroke()
      }

      // Horizon glow
      const hGlow = ctx.createLinearGradient(0, vy - 2, 0, vy + 60)
      hGlow.addColorStop(0, `rgba(${PURPLE},0)`)
      hGlow.addColorStop(0.4, `rgba(${PURPLE},0.12)`)
      hGlow.addColorStop(1, `rgba(${PURPLE},0)`)
      ctx.fillStyle = hGlow
      ctx.fillRect(0, vy - 2, W(), 62)
    }

    // ─────────────────────────────────────────
    // 2. 3D PERSPECTIVE CANDLES on the floor
    // ─────────────────────────────────────────
    const NUM_3D_CANDLES = 13
    const candle3DData = Array.from({ length: NUM_3D_CANDLES }, (_, i) => ({
      price: 0.3 + Math.random() * 0.5,
      isGreen: Math.random() > 0.45,
      wick: Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
    }))

    const draw3DCandles = () => {
      const vx = W() / 2
      const vy = H() * 0.48
      const spread = W() * 0.95
      const depth  = H() * 0.52

      for (let i = 0; i < NUM_3D_CANDLES; i++) {
        const t    = (i + 1) / (NUM_3D_CANDLES + 1)
        const tD   = Math.pow(t, 1.6)
        const x    = vx + (t - 0.5) * spread
        const yBot = vy + tD * depth
        const scl  = tD * 0.85 + 0.05
        const cd   = candle3DData[i]

        // Animate height gently
        const h = (cd.price + Math.sin(time * 0.8 + cd.phase) * 0.04) * 120 * scl
        const w = 14 * scl
        const color = cd.isGreen
          ? `rgba(${GREEN},${0.5 * scl + 0.1})`
          : `rgba(${RED},${0.5 * scl + 0.1})`

        // Shadow on floor
        ctx.beginPath()
        ctx.ellipse(x, yBot, w * 0.9, 3 * scl, 0, 0, Math.PI * 2)
        ctx.fillStyle = cd.isGreen
          ? `rgba(${GREEN},0.08)`
          : `rgba(${RED},0.08)`
        ctx.fill()

        // Body
        ctx.fillStyle = color
        ctx.fillRect(x - w / 2, yBot - h, w, h)

        // Top face (3D effect)
        ctx.fillStyle = cd.isGreen
          ? `rgba(${GREEN},${0.7 * scl})`
          : `rgba(${RED},${0.7 * scl})`
        ctx.fillRect(x - w / 2, yBot - h, w, 2 * scl)

        // Wick
        const wickH = cd.wick * 60 * scl
        ctx.beginPath()
        ctx.moveTo(x, yBot - h)
        ctx.lineTo(x, yBot - h - wickH)
        ctx.strokeStyle = color
        ctx.lineWidth = 1.5 * scl
        ctx.stroke()

        // Glow
        ctx.shadowColor = cd.isGreen ? `rgba(${GREEN},0.4)` : `rgba(${RED},0.4)`
        ctx.shadowBlur  = 8 * scl
        ctx.fillStyle   = color
        ctx.fillRect(x - w / 2, yBot - h, w, h)
        ctx.shadowBlur  = 0
      }
    }

    // ─────────────────────────────────────────
    // 3. MATRIX FINANCIAL RAIN
    // ─────────────────────────────────────────
    const CHARS = '₿$€£¥0123456789+-×÷%∑∆∞ABCDEFGHIJKLMNOPQRSTUVWXYZ▲▼◆'
    const FONT_SIZE = 13
    const RAIN_COLS = Math.floor(W() / FONT_SIZE)

    class RainDrop {
      constructor(col) {
        this.col    = col
        this.x      = col * FONT_SIZE
        this.y      = Math.random() * -500
        this.speed  = Math.random() * 1.5 + 0.5
        this.length = Math.floor(Math.random() * 18) + 6
        this.chars  = Array.from({ length: this.length }, () =>
          CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        this.opacity = Math.random() * 0.25 + 0.05
        this.mutateTimer = 0
      }
      update() {
        this.y += this.speed
        this.mutateTimer++
        if (this.mutateTimer > 8) {
          const idx = Math.floor(Math.random() * this.chars.length)
          this.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)]
          this.mutateTimer = 0
        }
        if (this.y > H() + this.length * FONT_SIZE) {
          this.y = Math.random() * -300
          this.speed = Math.random() * 1.5 + 0.5
        }
      }
      draw() {
        ctx.font = `${FONT_SIZE}px "DM Mono", monospace`
        for (let i = 0; i < this.chars.length; i++) {
          const charY  = this.y - i * FONT_SIZE
          if (charY < -FONT_SIZE || charY > H()) continue
          const bright = i === 0 ? 1 : (1 - i / this.chars.length)
          const op = this.opacity * bright
          if (i === 0) {
            // Leading char is bright white
            ctx.fillStyle = `rgba(255,255,255,${op * 2.5})`
            ctx.shadowColor = `rgba(${PURPLE},0.9)`
            ctx.shadowBlur  = 10
          } else {
            ctx.fillStyle = `rgba(${PURPLE},${op})`
            ctx.shadowBlur = 0
          }
          ctx.fillText(this.chars[i], this.x, charY)
          ctx.shadowBlur = 0
        }
      }
    }

    const rainDrops = Array.from(
      { length: Math.floor(RAIN_COLS * 0.35) },
      () => new RainDrop(Math.floor(Math.random() * RAIN_COLS))
    )

    // ─────────────────────────────────────────
    // 4. FLOATING PRICE TAGS
    // ─────────────────────────────────────────
    const PAIRS = ['BTC/USD','ETH/USD','EUR/USD','GOLD','S&P500','NAS100','GBP/USD','OIL']
    class PriceTag {
      constructor() { this.reset() }
      reset() {
        this.x      = Math.random() * W()
        this.y      = Math.random() * H() * 0.8
        this.vx     = (Math.random() - 0.5) * 0.2
        this.vy     = (Math.random() - 0.5) * 0.15
        this.pair   = PAIRS[Math.floor(Math.random() * PAIRS.length)]
        this.price  = (Math.random() * 9000 + 100).toFixed(2)
        this.up     = Math.random() > 0.45
        this.change = (Math.random() * 3).toFixed(2)
        this.opacity = Math.random() * 0.18 + 0.05
        this.scale  = Math.random() * 0.4 + 0.6
        this.life   = Math.random() * 400 + 200
        this.age    = 0
        this.updateTimer = 0
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        this.age++
        this.updateTimer++
        if (this.updateTimer > 60) {
          this.price = (parseFloat(this.price) + (Math.random() - 0.5) * 10).toFixed(2)
          this.change = (Math.random() * 3).toFixed(2)
          this.up     = Math.random() > 0.45
          this.updateTimer = 0
        }
        if (this.age > this.life ||
          this.x < -200 || this.x > W() + 200 ||
          this.y < -100 || this.y > H() + 100) {
          this.reset()
        }
      }
      draw() {
        const fadeIn  = Math.min(1, this.age / 40)
        const fadeOut = Math.min(1, (this.life - this.age) / 40)
        const op = this.opacity * fadeIn * fadeOut
        if (op <= 0) return

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.scale, this.scale)

        const color = this.up ? `74,222,128` : `248,113,113`
        const w = 110, h = 34

        // Background
        ctx.fillStyle = `rgba(10,10,8,${op * 3})`
        ctx.strokeStyle = `rgba(${color},${op * 2})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.roundRect(-w/2, -h/2, w, h, 4)
        ctx.fill()
        ctx.stroke()

        // Pair name
        ctx.fillStyle = `rgba(240,237,230,${op * 3})`
        ctx.font = `bold 9px "DM Mono", monospace`
        ctx.textAlign = 'left'
        ctx.fillText(this.pair, -w/2 + 7, -2)

        // Price
        ctx.fillStyle = `rgba(${color},${op * 3})`
        ctx.font = `bold 11px "DM Mono", monospace`
        ctx.fillText(`${this.up ? '▲' : '▼'} ${this.price}`, -w/2 + 7, 11)

        ctx.restore()
      }
    }

    const priceTags = Array.from({ length: 12 }, () => new PriceTag())

    // ─────────────────────────────────────────
    // 5. ENERGY WAVE from mouse
    // ─────────────────────────────────────────
    class EnergyWave {
      constructor(x, y) {
        this.x = x; this.y = y
        this.r = 0; this.life = 1
      }
      update() {
        this.r   += 3
        this.life -= 0.018
      }
      draw() {
        if (this.life <= 0) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${PURPLE},${this.life * 0.3})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    const waves = []
    let lastWaveTime = 0
    window.addEventListener('mousemove', () => {
      if (time - lastWaveTime > 0.3) {
        waves.push(new EnergyWave(mouse.x, mouse.y))
        if (waves.length > 8) waves.shift()
        lastWaveTime = time
      }
    })

    // ─────────────────────────────────────────
    // 6. HOLOGRAPHIC SCAN LINE
    // ─────────────────────────────────────────
    let scanY = -100

    // ─────────────────────────────────────────
    // 7. CORNER DATA DISPLAYS
    // ─────────────────────────────────────────
    const drawCornerData = () => {
      const lines = [
        `MARKET STATUS: OPEN`,
        `VOL: ${(Math.random() * 900 + 100).toFixed(0)}B`,
        `TICK: ${time.toFixed(1)}s`,
      ]
      ctx.font = `9px "DM Mono", monospace`
      ctx.fillStyle = `rgba(${PURPLE},0.25)`
      ctx.textAlign = 'left'
      lines.forEach((line, i) => {
        ctx.fillText(line, 16, H() - 50 + i * 14)
      })

      // Bottom right
      const rLines = ['SYSTEM: ACTIVE', 'STREAM: LIVE', 'LATENCY: <1ms']
      ctx.textAlign = 'right'
      rLines.forEach((line, i) => {
        ctx.fillText(line, W() - 16, H() - 50 + i * 14)
      })
    }

    // ─────────────────────────────────────────
    // MAIN DRAW LOOP
    // ─────────────────────────────────────────
    const render = () => {
      time += 0.016
      ctx.clearRect(0, 0, W(), H())

      // — Matrix rain (behind everything) —
      rainDrops.forEach(d => { d.update(); d.draw() })

      // — Perspective grid floor —
      drawPerspectiveGrid()

      // — 3D Candles on floor —
      draw3DCandles()

      // — Price tags —
      priceTags.forEach(p => { p.update(); p.draw() })

      // — Energy waves from mouse —
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].update()
        waves[i].draw()
        if (waves[i].life <= 0) waves.splice(i, 1)
      }

      // — Mouse glow —
      const mg = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 120
      )
      mg.addColorStop(0, `rgba(${PURPLE},0.08)`)
      mg.addColorStop(1, 'transparent')
      ctx.fillStyle = mg
      ctx.fillRect(0, 0, W(), H())

      // — Holographic scan line —
      scanY += 1.2
      if (scanY > H() + 100) scanY = -100
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      scanGrad.addColorStop(0,   'transparent')
      scanGrad.addColorStop(0.4, `rgba(${PURPLE},0.04)`)
      scanGrad.addColorStop(0.5, `rgba(${PURPLE},0.08)`)
      scanGrad.addColorStop(0.6, `rgba(${PURPLE},0.04)`)
      scanGrad.addColorStop(1,   'transparent')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 40, W(), 80)

      // Bright scan line
      ctx.beginPath()
      ctx.moveTo(0, scanY)
      ctx.lineTo(W(), scanY)
      const lGrad = ctx.createLinearGradient(0, 0, W(), 0)
      lGrad.addColorStop(0,   'transparent')
      lGrad.addColorStop(0.2, `rgba(${PURPLE},0.15)`)
      lGrad.addColorStop(0.5, `rgba(${PURPLE},0.35)`)
      lGrad.addColorStop(0.8, `rgba(${PURPLE},0.15)`)
      lGrad.addColorStop(1,   'transparent')
      ctx.strokeStyle = lGrad
      ctx.lineWidth = 1
      ctx.stroke()

      // — Corner data —
      drawCornerData()

      // — Edge vignette —
      const vig = ctx.createRadialGradient(
        W() / 2, H() / 2, H() * 0.25,
        W() / 2, H() / 2, H() * 1.1,
      )
      vig.addColorStop(0, 'transparent')
      vig.addColorStop(1, 'rgba(10,10,8,0.82)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W(), H())

      // — Top fade —
      const topFade = ctx.createLinearGradient(0, 0, 0, H() * 0.15)
      topFade.addColorStop(0, 'rgba(10,10,8,0.9)')
      topFade.addColorStop(1, 'transparent')
      ctx.fillStyle = topFade
      ctx.fillRect(0, 0, W(), H() * 0.15)

      // — Bottom fade —
      const botFade = ctx.createLinearGradient(0, H() * 0.88, 0, H())
      botFade.addColorStop(0, 'transparent')
      botFade.addColorStop(1, 'rgba(10,10,8,0.95)')
      ctx.fillStyle = botFade
      ctx.fillRect(0, H() * 0.88, W(), H() * 0.12)

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Ambient purple corner glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div style={{
          position:'absolute', width:'800px', height:'800px',
          borderRadius:'50%', top:'-300px', left:'-300px',
          background:'radial-gradient(circle, rgba(155,109,255,0.07), transparent 70%)',
          filter:'blur(60px)',
          animation:'bgOrb1 20s ease-in-out infinite',
        }}/>
        <div style={{
          position:'absolute', width:'600px', height:'600px',
          borderRadius:'50%', bottom:'-200px', right:'-200px',
          background:'radial-gradient(circle, rgba(155,109,255,0.06), transparent 70%)',
          filter:'blur(60px)',
          animation:'bgOrb2 25s ease-in-out infinite',
        }}/>
      </div>

      <style>{`
        @keyframes bgOrb1 {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(80px,60px) scale(1.1)}
          66%{transform:translate(-40px,90px) scale(0.95)}
        }
        @keyframes bgOrb2 {
          0%,100%{transform:translate(0,0) scale(1)}
          50%{transform:translate(-90px,-80px) scale(1.08)}
        }
      `}</style>
    </>
  )
}
