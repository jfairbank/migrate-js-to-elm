port module ImageUpload exposing (main)

import Html exposing (Html, button, div, img, input, label, li, text, ul)
import Html.Attributes exposing (class, for, id, multiple, src, type_, width)
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
    , url : String
    }


port uploadImages : () -> Cmd msg


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
    = UploadImages
    | ReceiveImages (List Image)
    | DeleteImage Id


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UploadImages ->
            ( model, uploadImages () )

        ReceiveImages images ->
            ( { model | images = images }
            , Cmd.none
            )

        DeleteImage id ->
            ( model, deleteImage id )


viewImage : Image -> Html Msg
viewImage image =
    li [ class "image-upload__image" ]
        [ img
            [ src image.url
            , width 400
            ]
            []
        , button
            [ class "image-upload__remove-image-button"
            , onClick (DeleteImage image.id) ]
            [ text "Remove" ]
        ]


view : Model -> Html Msg
view model =
    div [ class "image-upload" ]
        [ label [ for model.id ]
            [ text "+ Add Images" ]
        , input
            [ id model.id
            , type_ "file"
            , multiple True
            , onChange UploadImages
            ]
            []
        , ul [ class "image-upload__images" ]
            (List.map viewImage model.images)
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
