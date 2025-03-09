from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from dotenv import dotenv_values
from rest_framework import status as status_codes
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
config = dotenv_values(".env")

class OmdbApiClient:

    def __init__(self):
        self.base_url = config["OMDB_API_URL"]
        self.api_key = config["OMDB_API_KEY"]

    def get(self, path):
        try:
            response = requests.get(f"{self.base_url}?apikey={self.api_key}{path}")
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            raise e


class OmdbSearchApiView(APIView):

    def get(self, request):
        query = request.query_params.get("s", None)

        if not query:
            return Response("Missing query", status=status_codes.HTTP_400_BAD_REQUEST)

        data = []
        try:
            api_client = OmdbApiClient()
            response = api_client.get(f"&s={query}")
            result = response.json()
            data = [
                {
                    "title": item.get("Title", None),
                    "year": item.get("Year", None),
                    "poster": item.get("Poster", None),
                    "id": item.get("imdbID", None)
                }
                for item in result.get("Search", data)
            ]
        except Exception as e:
            status = getattr(
                e.response, "status_code", status_codes.HTTP_400_BAD_REQUEST
            )
            return Response({"message": str(e)}, status=status)

        return Response(data)


class OmdbMovieDetailApiView(APIView):

    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, request, id):

        data = {}
        try:
            api_client = OmdbApiClient()
            response = api_client.get(f"&i={id}")
            result = response.json()
            data = {
                "director": result.get("Director", "Unknown"),
                "plot": result.get("Plot", "No plot available"),
            }

        except Exception as e:
            status = getattr(
                e.response, "status_code", status_codes.HTTP_400_BAD_REQUEST
            )
            return Response({"message": str(e)}, status=status)

        return Response(data)