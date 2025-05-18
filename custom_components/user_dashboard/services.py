from homeassistant.core import HomeAssistant, ServiceCall
from .const import DOMAIN

async def async_assign(hass: HomeAssistant, call: ServiceCall) -> None:
    """Assign dashboards to users."""
    dashboards: list = call.data.get("dashboards", [])
    users: list = call.data.get("users", [])
    data = hass.data[DOMAIN]
    assignments = data["assignments"]
    for dash in dashboards:
        assignments.setdefault(dash, set()).update(users)
    await data["store"].async_save({k: list(v) for k, v in assignments.items()})
    hass.components.persistent_notification.async_create(
        f"Assigned users {users} to dashboards {dashboards}",
        title="User Dashboard Guard"
    )

async def async_unassign(hass: HomeAssistant, call: ServiceCall) -> None:
    """Unassign dashboards from users."""
    dashboards: list = call.data.get("dashboards", [])
    users: list = call.data.get("users", [])
    data = hass.data[DOMAIN]
    assignments = data["assignments"]
    for dash in dashboards:
        if dash in assignments:
            assignments[dash] -= set(users)
            if not assignments[dash]:
                assignments.pop(dash)
    await data["store"].async_save({k: list(v) for k, v in assignments.items()})
    hass.components.persistent_notification.async_create(
        f"Unassigned users {users} from dashboards {dashboards}",
        title="User Dashboard Guard"
    )
