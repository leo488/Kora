import { useInView } from '../ipaybtc/Scenes'
import heart from '../../assets/refreeg/icons/heart.svg'
import flag from '../../assets/refreeg/icons/flag.svg'
import coin from '../../assets/refreeg/icons/coin.svg'
import wallet from '../../assets/refreeg/icons/wallet.svg'
import trophy from '../../assets/refreeg/icons/trophy.svg'
import pencil from '../../assets/refreeg/icons/pencil.svg'

const ICONS = { heart, flag, coin, wallet, trophy, pencil }

export interface ChipSpec {
  icon: keyof typeof ICONS
  title: string
  amount: string
  time: string
  /** Left, top and width, as % of the plate. */
  x: number
  y: number
  w: number
}

/** A Refreeg notification pill laid over a photo, live in the page so it can
 *  move: it rises into place when the plate comes into view. */
export function Chip({ chip }: { chip: ChipSpec }) {
  const [ref, on] = useInView<HTMLDivElement>(0.5, true)
  return (
    <div
      ref={ref}
      className={`rf-chip${on ? ' is-in' : ''}`}
      style={{ left: `${chip.x}%`, top: `${chip.y}%`, width: `${chip.w}%` }}
      aria-hidden
    >
      <div className="rf-chip-pill">
        <span className="rf-chip-icon">
          <img src={ICONS[chip.icon]} alt="" />
        </span>
        <span className="rf-chip-text">
          <strong>{chip.title}</strong>
          <span>
            {chip.amount}
            <em>{chip.time}</em>
          </span>
        </span>
      </div>
    </div>
  )
}
