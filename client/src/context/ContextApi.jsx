import * as React from 'react'
import { createContext, useContext, useState } from 'react'

const Context = createContext()

export default function ContextApi({ children }) {
    return (
        <React.Fragment>
            <Context.Provider value={{}}>
                {children}
            </Context.Provider>
        </React.Fragment>
    )
}

export const useContextApi = () => useContext(Context)