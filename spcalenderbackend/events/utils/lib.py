from dataclasses import dataclass, field, asdict


@dataclass
class EventDateRange:
    start: str = ""
    end: str = ""

    def __str__(self) -> str:
        return f"{self.start} - {self.end}"


@dataclass
class SportEvent:
    page: int
    order: int

    id: str
    sport_type: str
    sport_subtype: str

    name: str = ""
    details: str = ""
    dates: EventDateRange = field(default_factory=EventDateRange)
    location: str = ""
    participants: int = 0

    gender_age_info: dict = field(default_factory=dict)

    def __str__(self) -> str:
        details = [
            f"id: {self.id}",
            f"sport: {self.sport_type}",
            f"subtype: {self.sport_subtype}",
            f"name: {self.name}" if self.name else "",
            f"dates: {self.dates}" if self.dates.start or self.dates.end else "",
            f"details: {self.details}" if self.details else "",
            f"location: {self.location}" if self.location else "",
            f"participants: {self.participants}" if self.participants > 0 else "",
            f"page: {self.page}",
            f"order: {self.order}",
        ]
        return "\n".join(filter(bool, details))


def convert_event_to_dict(event: SportEvent) -> dict:
    event_dict = asdict(event)

    if "dates" in event_dict:
        dates = event_dict["dates"]
        event_dict["dates"] = {"from": dates["start"], "to": dates["end"]}

    return event_dict
