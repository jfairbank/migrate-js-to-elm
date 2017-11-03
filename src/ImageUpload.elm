port module ImageUpload exposing (main)

import Html exposing (Html, button, div, img, input, text)
import Html.Attributes exposing (id, multiple, src, type_, width)
import Html.Events exposing (on, onClick)
import Json.Decode as Decode exposing (succeed)


onChange : msg -> Html.Attribute msg
onChange msg =
    on "change" (succeed msg)


type alias Flags =
    { id : String
    , images : List Image
    }


type alias Image =
    { id : Id
    , contents : String
    }


port uploadImage : () -> Cmd msg


port deleteImage : Id -> Cmd msg


port receiveImages : (List Image -> msg) -> Sub msg


type alias Id =
    String


type alias Model =
    { id : Id
    , images : List Image
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.id flags.images, Cmd.none )


type Msg
    = UploadImage
    | ReceiveImages (List Image)
    | DeleteImage Id


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UploadImage ->
            ( model, uploadImage () )

        ReceiveImages images ->
            ( { model | images = images }
            , Cmd.none
            )

        DeleteImage id ->
            ( model, deleteImage id )


viewImage : Image -> Html Msg
viewImage image =
    div []
        [ img
            [ src image.contents
            , width 400
            ]
            []
        , button
            [ onClick (DeleteImage image.id) ]
            [ text "Delete" ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ input
            [ id model.id
            , type_ "file"
            , multiple True
            , onChange UploadImage
            ]
            []
        , div [] (List.map viewImage model.images)
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    receiveImages ReceiveImages


main : Program Flags Model Msg
main =
    Html.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
