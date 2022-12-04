import { createContext, useContext, useState } from 'react'
import Script from 'next/script'
import { BOTD_PROXY_JS } from './constants'

const BotdReady = createContext(false)

/**
 * Initializes the botd agent
 */
export function botd(opts) {
    const Botd = (window).Botd

    if (!Botd) {
        throw new Error(
            `Botd hasn't been loaded yet, please use <BotdScript /> and wait for it to load before executing this function`
        )
    }

    return Botd.load({
        token: process.env.NEXT_PUBLIC_BOTD_API_TOKEN,
        mode: 'allData', // requestId is the default mode.
        // Add `endpoint` if the proxy is enabled
        // endpoint: BOTD_PROXY_API,
        ...opts,
    })
}

/**
 * Returns a bot protection result
 */
export async function botDetect(...args) {
    const agent = await botd()
    return agent.detect('Vercel', ...args)
}

export function BotdScript(props) {
    return <Script async src={BOTD_PROXY_JS} {...props} />
}

/**
 * Loads the Botd script and adds a ready state
 */
const Botd = ({ children, onLoad, ...scriptProps }) => {
    const [ready, setReady] = useState(false)

    return (
        <BotdReady.Provider value={ready}>
            {children}
            <BotdScript
                {...scriptProps}
                onLoad={(e) => {
                    setReady(true)
                    if (onLoad) onLoad(e)
                }}
            />
        </BotdReady.Provider>
    )
}

export default Botd

export const useBotdReady = () => useContext(BotdReady)