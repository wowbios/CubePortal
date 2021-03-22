FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE $PORT

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

# Fetch and install Node 10. Make sure to include the --yes parameter 
# to automatically accept prompts during install, or it'll fail.
RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install --yes nodejs

WORKDIR /src
COPY ["CubePortal/CubePortal.csproj", "CubePortal/"]
RUN dotnet restore "CubePortal/CubePortal.csproj"
COPY . .
WORKDIR "/src/CubePortal"
RUN dotnet build "CubePortal.csproj" -c Heroku -o /app/build

FROM build AS publish
RUN dotnet publish "CubePortal.csproj" -c Heroku -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CubePortal.dll"]
