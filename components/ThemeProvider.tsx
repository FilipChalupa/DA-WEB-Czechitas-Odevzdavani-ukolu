import { createMuiTheme, useMediaQuery } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'

export const primaryColor = pink
export const secondaryColor = blue
export const themeColor = primaryColor[500]

export const ThemeProvider: React.FunctionComponent = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
					primary: primaryColor,
					secondary: blue,
				},
			}),
		[prefersDarkMode],
	)

	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
