FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["CubePortal/CubePortal.csproj", "CubePortal/"]
RUN dotnet restore "CubePortal/CubePortal.csproj"
COPY . .
WORKDIR "/src/CubePortal"
RUN dotnet build "CubePortal.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CubePortal.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CubePortal.dll"]
