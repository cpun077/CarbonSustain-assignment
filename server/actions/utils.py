from .models import Action

# backend request functions

def post(action:str, date, points:int):
    return Action.objects.create(action=action, date=date, points=points)

def getall():
    return Action.objects.all()

def get(id:int):
    return Action.objects.get(id=id)

def put(id:int, **kwargs): # kwargs allow user to update any fields
    action = get(id)
    
    if "action" in kwargs:
        action.action = kwargs["action"]

    if "date" in kwargs:
        action.date = kwargs["date"]

    if "points" in kwargs:
        action.points = kwargs["points"]

    action.save()
    return action

def delete(id:int):
    action = get(id)
    return action.delete()