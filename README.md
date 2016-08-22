# node_door
Use node.js to control garage door using C.H.I.P mini computer

## Materials needed
-- C.H.I.P.  mini computer https://getchip.com/ (i'm running a debian headless image on it)
-- relay that can be switched with 3.3v
-- some interface. I'm using openHab, but you may just want to operate it through a webpage interface
-- some reed switches for figuring out door state (2x window/door reed switch form aliexpress with do the trick)

## Steps to implement

1. Install image on chip using chrome extension
2. Setup node https://nodejs.org/en/download/package-manager/
3. Deploy code from this git repo
4. Satisfy dependencies
5. Connect pins to reed switches for state reporting
6. Connect to button terminals on door opener
7. Configure openHab
