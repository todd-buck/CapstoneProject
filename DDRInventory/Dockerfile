FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /DDRInventory

# Copy everything
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /DDRInventory
COPY --from=build-env /DDRInventory/out .

CMD dotnet HelloWorld.dll --urls "http://*:$PORT"