from aiohttp import web
from homeassistant.core import callback
from .const import DOMAIN

async def async_setup_api(hass):
    """Set up the API endpoint for access checks."""

    @callback
    async def check_access(request):
        user = request["hass_user"].name
        dash = request.query.get("dashboard")
        
        always_allowed = {"user-dashboard-admin", "user-dashboard-denied"}  # set of always allowed dashboards
        if dash in always_allowed:
            return web.Response(status=200)
            
        allowed = hass.data[DOMAIN]["assignments"].get(dash, set())
        return web.Response(status=200) if user in allowed else web.Response(status=403)

    hass.http.register_view(
        web.View(
            url_path=f"/api/{DOMAIN}/check",
            name=f"api:{DOMAIN}:check",
            method="GET",
            handler=check_access
        )
    )
