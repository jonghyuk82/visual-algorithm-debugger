from fastapi import FastAPI

app = FastAPI(title="Visual Algorithm Debugger API")

@app.get("/health")
def health():
    return {"status": "ok"}