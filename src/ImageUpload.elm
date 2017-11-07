port module ImageUpload exposing (main)

import Html exposing (Html, div, img, input, label, li, text, ul)
import Html.Attributes exposing (class, for, id, multiple, src, type_, width)
import Html.Events exposing (on)
import Json.Decode as Decode exposing (succeed)


onChange : msg -> Html.Attribute msg
onChange msg =
    on "change" (succeed msg)


type alias Id =
    String


type alias Image =
    { id : Id
    , url : String
    }


port uploadImages : () -> Cmd msg


port receiveImages : (List Image -> msg) -> Sub msg


type alias Model =
    { images : List Image }


init : ( Model, Cmd Msg )
init =
    ( Model [], Cmd.none )


viewImage : Image -> Html Msg
viewImage image =
    li [ class "image-upload__image" ]
        [ img
            [ src image.url
            , width 400
            ]
            []
        ]


view : Model -> Html Msg
view model =
    div [ class "image-upload" ]
        [ label [ for "file-upload" ]
            [ text "+ Add Images" ]
        , input
            [ id "file-upload"
            , type_ "file"
            , multiple True
            , onChange UploadImages
            ]
            []
        , ul [ class "image-upload__images" ]
            (List.map viewImage model.images)
        ]


type Msg
    = UploadImages
    | ReceiveImages (List Image)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UploadImages ->
            ( model, uploadImages () )

        ReceiveImages images ->
            ( { model | images = images }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    receiveImages ReceiveImages


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
